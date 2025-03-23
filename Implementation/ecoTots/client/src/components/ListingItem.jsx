import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaVenusMars, FaTshirt, FaRuler, FaCheckCircle } from "react-icons/fa";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full max-w-[300px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105
        transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            {" "}
            <MdLocationOn />
            <p className="text-sm text-gray-600 truncate"> {listing.address}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>

        {/* Additional Details - Compact with Icons */}
        <div className="flex flex-wrap gap-2 text-xs text-gray-700 mt-1">
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

          <p className="text-slate-500 mt-2 font-semibold">
            ${listing.discountedPrice}
          </p>
        </div>
      </Link>
    </div>
  );
}
