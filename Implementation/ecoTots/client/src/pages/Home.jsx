// import React from 'react'
// import { Link } from 'react-router-dom'

// export default function Home() {
//   return (
//     <div>
//       {/* {Top} */}
//         <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
//           <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
//             Find your next <span className='text-slate-500'>perfect</span>
//             <br />
//             place with ease
//           </h1>
//           <div className='text-gray-400 text-xs sm:text-sm'>
//             Sahand Esstate Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum expedita autem exercitationem, 
//             <br />
//             mollitia dolore accusantium laborum atque quae consectetur culpa similique corporis eos ea possimus corrupti dolores fuga, odit facilis!
//           </div>
//           <Link to={"/search"} className='text-xs sm:text-sm text-bluw-800 font-bold hover:underline'>
//           Let's get started...
//           </Link>
//         </div>



//       {/* {Swiper} */}



//       {/* {listing results for offers} */}
//     </div>
//   )
// }

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import ChatbotPage from "./ChatbotPage";

export default function Home() {
  const [boysListings, setBoysListings] = useState([]);
  const [girlsListings, setGirlsListings] = useState([]);
  const [popularListings, setPopularListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async (gender, setListings) => {
      try {
        const res = await fetch(`/api/listing/get?gender=${gender}&limit=6`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setListings(data);
        }
      } catch (error) {
        console.error(`Error fetching ${gender} listings:`, error);
      }
    };

    const fetchPopularListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?sort=popularity&limit=6`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setPopularListings(data);
        }
      } catch (error) {
        console.error("Error fetching popular listings:", error);
      }
    };

    fetchListings("Boys", setBoysListings);
    fetchListings("Girls", setGirlsListings);
    fetchPopularListings();
    setLoading(false);
  }, []);

  return (
    <div className="p-5 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-12 bg-blue-50 rounded-lg">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find the <span className="text-blue-500">perfect</span> outfit  
          <br /> for your little one
        </h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto mt-3">
          Discover a curated selection of quality kids' clothing at great prices.
        </p>
        <Link
          to="/search"
          className="mt-5 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Start Shopping
        </Link>
      </div>

      {/* Boys Collection Swiper */}
      <section className="mt-10">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-semibold text-slate-700">Boys' Collection</h2>
          <Link to="/search?gender=Boys" className="text-blue-600 text-sm hover:underline">
            View All →
          </Link>
        </div>
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          spaceBetween={10}
          navigation
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="mt-5"
        >
          {loading ? <p>Loading...</p> : boysListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <ListingItem listing={listing} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Girls Collection Swiper */}
      <section className="mt-10">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-semibold text-slate-700">Girls' Collection</h2>
          <Link to="/search?gender=Girls" className="text-blue-600 text-sm hover:underline">
            View All →
          </Link>
        </div>
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          spaceBetween={10}
          navigation
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="mt-5"
        >
          {loading ? <p>Loading...</p> : girlsListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <ListingItem listing={listing} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Trending Listings Swiper */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-slate-700 text-center">Trending Now</h2>
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          spaceBetween={10}
          navigation
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="mt-5"
        >
          {loading ? <p>Loading...</p> : popularListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <ListingItem listing={listing} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Newsletter Subscription
      <section className="mt-16 text-center bg-gray-100 py-10 rounded-lg">
        <h2 className="text-2xl font-semibold text-slate-700">Stay Updated</h2>
        <p className="text-gray-500 mt-2">Subscribe to get the latest deals and updates.</p>
        <div className="flex justify-center mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-3 rounded-lg w-1/2"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg ml-2 hover:bg-blue-700">
            Subscribe
          </button>
        </div>
      </section> */}

          {/* Chatbot Integration*/}
      <section className="mt-1 text-center bg-gray-100 rounded-lg">
        <div className="flex justify-center mt-4">
          <ChatbotPage />
          
        </div>
      </section>

    </div>
  );
}


