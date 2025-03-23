// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore from 'swiper';
// import { useSelector } from 'react-redux';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css/bundle';
// import {
//   FaTshirt,
//   FaVenusMars,
//   FaShare,
// } from 'react-icons/fa';
// import Contact from '../components/Contact';

// export default function Listing() {
//     SwiperCore.use([Navigation]);
//     const [listing, setListing] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(false);
//     const [copied, setCopied] = useState(false);
//     const [contact, setContact] = useState(false);
//     const params = useParams();
//     const {currentUser} = useSelector((state) => state.user);
//     useEffect(() => {
//       const fetchListing = async () => {
//         try {
//           setLoading(true);
//           const res = await fetch(`/api/listing/get/${params.listingId}`);
//           const data = await res.json();
//           if (data.success === false) {
//             setError(true);
//             setLoading(false);
//             return;
//           }
//           setListing(data);
//           setLoading(false);
//           setError(false);
//         } catch (error) {
//           setError(true);
//           setLoading(false);
//         }
//       };
//       fetchListing();
//     }, [params.listingId]);
//     console.log(loading);

//     return (
//         <main>
//           {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
//           {error && (
//             <p className='text-center my-7 text-2xl'>Something went wrong!</p>
//           )}
//           {listing && !loading && !error && (
//             <div>
//               <Swiper navigation>
//                 {listing.imageUrls.map((url) => (
//                   <SwiperSlide key={url}>
//                     <div
//                       className='h-[550px]'
//                       style={{
//                         background: `url(${url}) center no-repeat`,
//                         backgroundSize: 'cover',
//                       }}
//                     ></div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>


//               <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
//             <FaShare
//               className='text-slate-500'
//               onClick={() => {
//                 navigator.clipboard.writeText(window.location.href);
//                 setCopied(true);
//                 setTimeout(() => {
//                   setCopied(false);
//                 }, 2000);
//               }}
//             />
//             {copied && (
//             <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
//               Link copied!
//             </p>
//           )}
//           </div>
//             <div>
//             <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
//             <p className='text-2xl font-semibold'>
//               {listing.name} - ${listing.discountedPrice}
//               </p>
//               <p className='font-semibold'>Original Price - ${listing.price}</p>

//             {/* <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
//               <FaMapMarkerAlt className='text-green-700' />
//               {listing.address}
//             </p> */}

//                 <ul className='flex flex-wrap font-semibold text-sm items-center gap-4 sn:gap-6'>

//                   <li className='flex items-center gap-1 whitespace-nowrap'>
//                     <FaTshirt/>
//                     {listing.category}
//                   </li>
                
//                   <li className='flex'>
//                     <p>Brand : </p>
//                     {' '}{listing.brand}
//                   </li>

//                   <li className='flex items-center gap-1 whitespace-nowrap'>
//                     <FaVenusMars/>
//                     {listing.gender}
//                   </li>

//                   <li className='flex'>
//                     <p>Size : </p>
//                     {' '}{listing.size}
//                   </li>

//                   <li className='flex'>
//                     <p>Condition : </p> 
//                     {' '}{listing.condition}
//                   </li>
//                 </ul>

//                 <p className='text-slate-800'>
//                   <span className='font-semibold text-black'>
//                   Description - 
//                     </span>{ listing.description}
//                 </p>

//                 {currentUser && listing.userRef !== currentUser._id && !contact && (
//               <button onClick={()=>setContact(true)} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'>
//                 Contact Seller
//               </button>
//             )}
//             {contact && <Contact listing={listing}/>}
//               </div>
//               </div>
//             </div>
//           )}
//         </main>
//       );
//     }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaTshirt,
  FaVenusMars,
  FaShare,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import Contact from "../components/Contact";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ListingItem from "../components/ListingItem";

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();

        if (!res.ok) throw new Error("Failed to fetch listing");

        setListing(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  // Handle image navigation in modal
  const handlePrevImage = () => {
    if (!listing || !selectedImage) return;
    const currentIndex = listing.imageUrls.indexOf(selectedImage);
    const prevIndex =
      (currentIndex - 1 + listing.imageUrls.length) % listing.imageUrls.length;
    setSelectedImage(listing.imageUrls[prevIndex]);
  };

  const handleNextImage = () => {
    if (!listing || !selectedImage) return;
    const currentIndex = listing.imageUrls.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % listing.imageUrls.length;
    setSelectedImage(listing.imageUrls[nextIndex]);
  };

  return (
    <main className="max-w-6xl mx-auto px-5 py-10">
      {loading && <p className="text-center text-xl">Loading...</p>}
      {error && <p className="text-center text-xl text-red-500">Something went wrong!</p>}

      {listing && !loading && !error && (
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Section: Image Gallery */}
          <div>
            {/* Main Large Image */}
            <img
              src={listing.imageUrls[0]}
              alt="Main listing"
              className="w-full h-80 object-cover rounded-lg shadow-md cursor-pointer"
              onClick={() => setSelectedImage(listing.imageUrls[0])}
            />

            {/* Smaller Thumbnails */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {listing.imageUrls.slice(1).map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Listing image ${index + 2}`}
                  className="w-full h-28 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                  onClick={() => setSelectedImage(url)}
                />
              ))}
            </div>
          </div>

          {/* Right Section: Listing Details */}
          <div className="flex flex-col gap-4">
            {/* Share Button */}
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{listing.name}</h1>
              <button
                className="border p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                <FaShare className="text-gray-600" />
              </button>
            </div>
            {copied && <p className="text-sm text-green-600">Link copied!</p>}

            {/* Pricing */}
            <div className="text-lg font-semibold text-green-600">
              ${listing.discountedPrice}{" "}
              <span className="line-through text-gray-500 text-sm">${listing.price}</span>
            </div>

            {/* Product Info */}
            <ul className="grid grid-cols-2 gap-3 text-gray-700">
              <li className="flex items-center gap-2">
                <FaTshirt className="text-blue-500" />
                {listing.category}
              </li>
              <li>
                <span className="font-semibold">Brand:</span> {listing.brand}
              </li>
              <li className="flex items-center gap-2">
                <FaVenusMars className="text-pink-500" />
                {listing.gender}
              </li>
              <li>
                <span className="font-semibold">Size:</span> {listing.size}
              </li>
              <li>
                <span className="font-semibold">Condition:</span> {listing.condition}
              </li>
            </ul>

            {/* Description */}
            <p className="text-gray-800">
              <span className="font-semibold text-black">Description:</span> {listing.description}
            </p>

            {/* Contact Seller Button */}
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-blue-600 text-white rounded-lg py-2 mt-3 hover:bg-blue-700 transition"
              >
                Contact Seller
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}


      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            className="absolute top-5 right-5 text-white text-2xl"
            onClick={() => setSelectedImage(null)}
          >
            <FaTimes />
          </button>
          <button
            className="absolute left-5 text-white text-3xl"
            onClick={handlePrevImage}
          >
            <FaArrowLeft />
          </button>
          <img
            src={selectedImage}
            alt="Enlarged view"
            className="max-w-3xl w-full max-h-[90vh] object-contain rounded-lg"
          />
          <button
            className="absolute right-5 text-white text-3xl"
            onClick={handleNextImage}
          >
            <FaArrowRight />
          </button>
        </div>
      )}
    </main>
  );
}

