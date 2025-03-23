import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    gender: "all", // Added gender filter
    //  parking: false,
    //  furnished: false,
    // offer: false,
    sort: "created_at",
    order: "desc",
  });

  console.log(sidebardata);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  console.log(listings);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const genderFromUrl = urlParams.get("gender"); // Get gender from URL
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (searchTermFromUrl || typeFromUrl || sortFromUrl || orderFromUrl) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        gender: genderFromUrl || "all", // Set gender
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    // const fetchListings = async () => {
    //   setLoading(true);
    //   const searchQuery = urlParams.toString();
    //   const res = await fetch(`/api/listing/get?${searchQuery}`);
    //   const data = await res.json();
    //   setListings(data);
    //   setLoading(false);
    // };

    const fetchListings = async () => {
      setLoading(true);
      try {
        const searchQuery = new URLSearchParams(location.search).toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
    
        if (Array.isArray(data)) {
          setListings(data);
        } else {
          console.error("Unexpected response format:", data);
          setListings([]); // Ensure listings is always an array
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings([]); // Prevent crash
      }
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  // const handleChange = (e) => {
  //   if (
  //     e.target.id === "all" ||
  //     e.target.id === "new" ||
  //     e.target.id === "used"
  //   ) {
  //     setSidebardata({ ...sidebardata, type: e.target.id });
  //   }

  //   if (e.target.id === "searchTerm") {
  //     setSidebardata({ ...sidebardata, searchTerm: e.target.value });
  //   }

  //   if (e.target.id === "gender")
  //    {
  //      setSidebardata({
  //        ...sidebardata,
  //        [e.target.id]:
  //          e.target.checked || e.target.checked === 'true' ? true : false,
  //      });
  //    }

  //   if (e.target.id === "sort_order") {
  //     const sort = e.target.value.split("_")[0] || "created_at";

  //     const order = e.target.value.split("_")[1] || "desc";

  //     setSidebardata({ ...sidebardata, sort, order });
  //   }
  // };

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
    urlParams.set("gender", sidebardata.gender); // Include gender
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
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
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <span>All</span>
            </div>
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="new"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "new"}
              />
              <span>New</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="used"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "used"}
              />
              <span>Used</span>
            </div>

            {/* Gender Filter */}
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold">Gender:</label>
              {["all", "Boys", "Girls", "Unisex"].map((gender) => (
                <div key={gender} className="flex gap-2">
                  <input
                    type="radio" // Change to radio buttons
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
              <option value="regularPrice_asc">Price low to hight</option>
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
        <div className="p-7 flex flex-wrap gap-4 ">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found! </p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}

          {/* {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))} */}

          {!loading &&
            Array.isArray(listings) &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
        </div>
      </div>
    </div>
  );
}
