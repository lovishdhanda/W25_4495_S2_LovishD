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
      <div className="text-center py-12 bg-gradient-to-r from-pink-100 to-yellow-100 rounded-lg">
        <h1 className="text-pink-600 font-bold text-3xl lg:text-6xl">
          Find the <span className="text-yellow-500">perfect</span> outfit  
          <br /> for your little one
        </h1>
        <p className="text-yellow-700 text-sm sm:text-base max-w-2xl mx-auto mt-3">
          Discover a curated selection of quality kids' clothing at great prices.
        </p>
        <Link
          to="/search"
          className="mt-5 inline-block bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition"
        >
          Start Shopping
        </Link>
      </div>

      {/* Boys Collection Swiper (Cute Blue Theme) */}
      <section className="mt-10">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-semibold text-blue-500">Boys' Collection</h2>
          <Link to="/search?gender=Boys" className="text-blue-500 text-sm hover:underline">
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
          <h2 className="text-2xl font-semibold text-pink-600">Girls' Collection</h2>
          <Link to="/search?gender=Girls" className="text-yellow-600 text-sm hover:underline">
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
        <h2 className="text-2xl font-semibold text-pink-600 text-center">Trending Now</h2>
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

      {/* Chatbot Integration (Neutral Theme) */}
      <section className="mt-10 text-center bg-gray-200 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700">Need Help? Chat with Us</h2>
        <div className="flex justify-center mt-4">
          <ChatbotPage />
        </div>
      </section>
    </div>
  );
}
