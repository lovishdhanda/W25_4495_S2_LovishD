import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaMapMarkerAlt,
  FaTshirt,
  FaVenusMars,
} from 'react-icons/fa';

export default function Listing() {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const params = useParams();
    useEffect(() => {
      const fetchListing = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/listing/get/${params.listingId}`);
          const data = await res.json();
          if (data.success === false) {
            setError(true);
            setLoading(false);
            return;
          }
          setListing(data);
          setLoading(false);
          setError(false);
        } catch (error) {
          setError(true);
          setLoading(false);
        }
      };
      fetchListing();
    }, [params.listingId]);
    console.log(loading);

    return (
        <main>
          {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
          {error && (
            <p className='text-center my-7 text-2xl'>Something went wrong!</p>
          )}
          {listing && !loading && !error && (
            <div>
              <Swiper navigation>
                {listing.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <div
                      className='h-[550px]'
                      style={{
                        background: `url(${url}) center no-repeat`,
                        backgroundSize: 'cover',
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div>
                <p className='text-slate-800'>
                  <span className='font-semibold text-black'>
                  Description - 
                    </span>{ listing.description}
                </p>

                <ul className='flex font-semibold text-sm items-center gap-4 sn:gap-6'>
                  <li className='flex items-center gap-1 whitespace-nowrap'>
                    <FaVenusMars/>
                    {listing.gender}
                  </li>

                  <li className='flex items-center gap-1 whitespace-nowrap'>
                    <FaTshirt/>
                    {listing.category}
                  </li>

                </ul>
              </div>
            </div>
          )}
        </main>
      );
    }