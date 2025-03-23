import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaVenusMars, FaTshirt, FaRuler, FaCheckCircle } from "react-icons/fa";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden rounded-lg w-full max-w-[300px] mx-auto">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300 rounded-t-lg"
        />
        <div className="p-4 flex flex-col gap-3 bg-gradient-to-b from-yellow-50 to-white">
          {/* Product Name */}
          <p className="truncate text-xl font-semibold text-slate-700 text-center">
            {listing.name}
          </p>
          
          {/* Title & Price */}
          <div className="p-2 flex-grow flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold text-indigo-600 truncate">{listing.title}</h3>
            <span className="text-green-600 font-bold text-xl mt-2">
              ${listing.discountedPrice}
            </span>
            <span className="text-gray-400 line-through text-sm mt-1">
              ${listing.price}
            </span>
          </div>

          {/* Additional Details with Icons */}
          <div className="flex flex-wrap gap-2 justify-center text-xs text-gray-700 mt-2">
            <div className="flex items-center gap-1">
              <FaVenusMars className="text-blue-500" />
              <span>{listing.gender}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaTshirt className="text-green-500" />
              <span>{listing.brand}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaRuler className="text-purple-500" />
              <span>{listing.size}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaCheckCircle className="text-yellow-500" />
              <span>{listing.condition}</span>
            </div>
          </div>

          {/* Location */}
          {/* <div className="flex gap-1 items-center mt-2 text-sm text-gray-600">
            <MdLocationOn className="text-blue-500" />
            <span>{listing.location}</span>
          </div> */}
        </div>
      </Link>
    </div>
  );
}
