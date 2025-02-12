import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    category: '',
    size: '',
    gender: '',
    price: 50,
    discountedPrice: 50,
    brand: '',
    material: '',
    condition: '',
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  //console.log(files);
  console.log(formData);

  const handleImageSubmit = (e) => {
    //e.prevent.default(); not inside the form
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = []; //more than one asynchrompous behaviour

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload Failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  // const handleRemoveImage = (index) => {
  //   setFormData({
  //     ...formData,
  //     imageUrls: formData.imageUrls.filter((_, i) => i !== index),
  //   })
  // }

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  //fetching the inputs
  const handleChange = (e) => {

    if (e.target.id === 'gender'){
      setFormData({
        ...formData,
       gender: e.target.value,
      });
    }

    if (e.target.id === 'condition'){
      setFormData({
        ...formData,
        condition: e.target.value,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.price < +formData.discountedPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      console.log("API Response:", data); // Debugging step
      setLoading(false);

      // if (!data || !data._id) {
      //   setError("Listing creation failed. Please try again.");
      //   return;
      // }
      if (data.success === false){
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);

    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <main className="p-6 max-w-3xl mx-auto bg-gradient-to-r from-pink-100 to-blue-100 shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center my-6 text-pink-700">
        Sell Your Kids' Clothing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Name */}
        <input
          type="text"
          placeholder="Item Name"
          className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400"
          id="name"
          maxLength="62"
          minLength="10"
          required
          onChange={handleChange}
          value={formData.name}
        />

        {/* Description */}
        <textarea
          placeholder="Describe your item (e.g., style, condition, any flaws)"
          className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
          id="description"
          required
          onChange={handleChange}
          value={formData.description}
        />

        {/* Category & Size */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Category (e.g., Shirts, Jackets)"
            className="border p-3 rounded-lg flex-1 shadow-sm focus:ring-2 focus:ring-pink-400"
            id="category"
            required
            onChange={handleChange}
          value={formData.category}
          />
          <input
            type="text"
            placeholder="Size (S, M, L, XL)"
            className="border p-3 rounded-lg flex-1 shadow-sm focus:ring-2 focus:ring-blue-400"
            id="size"
            required
            onChange={handleChange}
          value={formData.size}
          />
        </div>

        {/* Gender */}
        <select
          className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400"
          id="gender"
          required
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Boys">Boys</option>
          <option value="Girls">Girls</option>
          <option value="Unisex">Unisex</option>
        </select>

        {/* Price & Discounted Price */}
        <div className="flex flex-col sm:flex-row gap-4">
          <label>Price ($)</label>
          <input
            type="number"
            placeholder="Price ($)"
            className="border p-3 rounded-lg flex-1 shadow-sm focus:ring-2 focus:ring-blue-400"
            min='50'
            max='1000'
            id="price"
            required
            onChange={handleChange}
            value={formData.price}
          />
          <label>Discounted Price ($)</label>
          <input
            type="number"
            placeholder="Discounted Price ($)"
            className="border p-3 rounded-lg flex-1 shadow-sm focus:ring-2 focus:ring-pink-400"
            id="discountedPrice"
            onChange={handleChange}
            value={formData.discountedPrice}
          />
        </div>

        {/* Brand & Material */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Brand (Optional)"
            className="border p-3 rounded-lg flex-1 shadow-sm focus:ring-2 focus:ring-blue-400"
            id="brand"
            onChange={handleChange}
            value={formData.brand}
          />
          <input
            type="text"
            placeholder="Material (Cotton, Wool, etc.)"
            className="border p-3 rounded-lg flex-1 shadow-sm focus:ring-2 focus:ring-pink-400"
            id="material"
            onChange={handleChange}
            value={formData.material}
          />
        </div>

        {/* Condition */}
        <select
          className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
          id="condition"
          required
          value={formData.condition}
          onChange={handleChange}
        >
          <option value="">Select Condition</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
        {/* Image Upload */}
        <div className="border p-4 rounded-lg bg-pink-50 shadow-sm gap-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <label className="block text-pink-700 font-medium mb-2 sm:mb-0">
              Upload Images
            </label>
            <input
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              accept="image/*"
              multiple
              className="w-full sm:w-auto border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
              id="images"
              required
            />
          </div>
          <button
            type="button"
            disabled={uploading}
            onClick={handleImageSubmit}
            className="mt-3 sm:mt-0 sm:ml-4 p-3 text-pink-700 border-2 border-pink-700 rounded-lg uppercase font-semibold hover:bg-pink-100 transition duration-300"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
        <p className="text-red-700">{imageUploadError && imageUploadError}</p>
        {/* {
          formData.imageUrls.length > 0 && formData.imageUrls.map((url) => (
            <div className="flex justify-between p-3 border items-center">
              <img src={url} alt="listing image" className="w-20 h-20 object-contain rounded-lg" />
              <button className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">Delete</button>
            </div>
          ))
        } */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="relative group bg-white border shadow-md rounded-lg overflow-hidden"
              >
                {/* Image */}
                <img
                  src={url}
                  alt="Listing"
                  className="w-full h-32 object-cover"
                />

                {/* Delete Button (Shows on Hover) */}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-75 transition duration-300"
                >
                  ✖
                </button>
              </div>
            ))}
        </div>

        {/* Submit Button */}
        <button disabled={ loading || uploading}
          type="submit"
          className="bg-gradient-to-r from-pink-400 to-yellow-300 text-white py-3 rounded-lg font-semibold hover:from-pink-500 hover:to-yellow-400 shadow-md transition duration-300"
        >
          {loading ? 'Creating...' : 'Create Listing'}
        </button>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </form>
    </main>
  );
}
