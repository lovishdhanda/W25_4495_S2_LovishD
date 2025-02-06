import React from "react";

export default function CreateListing() {
    return (
      <main className="p-6 max-w-3xl mx-auto bg-gradient-to-r from-pink-100 to-blue-100 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center my-6 text-pink-700">
          Sell Your Kids' Clothing
        </h1>
        <form className="flex flex-col gap-6">
          {/* Name */}
          <input
            type="text"
            placeholder="Item Name"
            className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
  
          {/* Description */}
          <textarea
            placeholder="Describe your item (e.g., style, condition, any flaws)"
            className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            id="description"
            required
          />
  
          {/* Category & Size */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Category (e.g., Shirts, Jackets)"
              className="border p-3 rounded-lg flex-1 shadow-sm focus:ring-2 focus:ring-pink-400"
              id="category"
              required
            />
            <input
              type="text"
              placeholder="Size (S, M, L, XL)"
              className="border p-3 rounded-lg flex-1 shadow-sm focus:ring-2 focus:ring-blue-400"
              id="size"
              required
            />
          </div>
  
          {/* Gender */}
          <select className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400" id="gender" required>
            <option value="">Select Gender</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
            <option value="Unisex">Unisex</option>
          </select>
  
          {/* Price & Discounted Price */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="number"
              placeholder="Price ($)"
              className="border p-3 rounded-lg flex-1 shadow-sm focus:ring-2 focus:ring-blue-400"
              id="price"
              required
            />
            <input
              type="number"
              placeholder="Discounted Price ($)"
              className="border p-3 rounded-lg flex-1 shadow-sm focus:ring-2 focus:ring-pink-400"
              id="discountedPrice"
            />
          </div>
  
          {/* Brand & Material */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Brand (Optional)"
              className="border p-3 rounded-lg flex-1 shadow-sm focus:ring-2 focus:ring-blue-400"
              id="brand"
            />
            <input
              type="text"
              placeholder="Material (Cotton, Wool, etc.)"
              className="border p-3 rounded-lg flex-1 shadow-sm focus:ring-2 focus:ring-pink-400"
              id="material"
            />
          </div>
  
          {/* Condition */}
          <select className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400" id="condition" required>
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
  {/* Image Upload */}
<div className="border p-4 rounded-lg bg-pink-50 shadow-sm gap-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
  <div className="flex flex-col sm:flex-row sm:gap-4">
    <label className="block text-pink-700 font-medium mb-2 sm:mb-0">Upload Images</label>
    <input
      type="file"
      accept="image/*"
      multiple
      className="w-full sm:w-auto border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
      id="images"
      required
    />
  </div>
  <button
    className="mt-3 sm:mt-0 sm:ml-4 p-3 text-pink-700 border-2 border-pink-700 rounded-lg uppercase font-semibold hover:bg-pink-100 transition duration-300"
  >
    Upload
  </button>
</div>


  
         {/* Submit Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-pink-400 to-yellow-300 text-white py-3 rounded-lg font-semibold hover:from-pink-500 hover:to-yellow-400 shadow-md transition duration-300"
        >
          List Clothing for Sale
        </button>
        </form>
      </main>
    );
  }
  
  
  
