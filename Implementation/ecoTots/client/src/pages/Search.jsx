import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    gender: "all",
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const genderFromUrl = urlParams.get("gender");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (searchTermFromUrl || typeFromUrl || sortFromUrl || orderFromUrl) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        gender: genderFromUrl || "all",
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    setPage(1); // Reset page when filters change
    fetchListings(false, 1);
  }, [location.search]);

  const fetchListings = async (append = false, pageNumber = 1) => {
    setLoading(true);
    try {
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("page", pageNumber);
      urlParams.set("limit", 8);

      const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setListings((prev) => {
          const newListings = data.filter(
            (listing) => !prev.some((prevItem) => prevItem._id === listing._id)
          );
          return append ? [...prev, ...newListings] : newListings;
        });

        setShowMore(data.length === 8);
      } else {
        console.error("Unexpected response format:", data);
        setListings([]);
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
      setListings([]);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    if (["all", "new", "used"].includes(e.target.id)) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (e.target.name === "gender") {
      setSidebardata({ ...sidebardata, gender: e.target.value });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("gender", sidebardata.gender);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    navigate(`/search?${urlParams.toString()}`);
  };

  const onShowMoreClick = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchListings(true, nextPage);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            {["all", "new", "used"].map((type) => (
              <div key={type} className="flex gap-2">
                <input
                  type="checkbox"
                  id={type}
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.type === type}
                />
                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              </div>
            ))}
          </div>

          {/* Gender Filter */}
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Gender:</label>
            {["all", "Boys", "Girls", "Unisex"].map((gender) => (
              <div key={gender} className="flex gap-2">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.gender === gender}
                />
                <span>{gender}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:
        </h1>
        <div className="p-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listings found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}

          {!loading &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
