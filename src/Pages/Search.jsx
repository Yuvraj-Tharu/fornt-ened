import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../Components/ListingItem";

export default function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [listing1, setListing1] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [sidebar, setSidebar] = useState({
    serachTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });

  console.log(sidebar);

  const handelChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale" ||
      e.target.id === "land"
    ) {
      setSidebar({ ...sidebar, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebar({ ...sidebar, serachTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebar({
        ...sidebar,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebar({ ...sidebar, sort, order });
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebar({
        serachTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }
    const fetchData = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      let result = await fetch(
        `https://deploy-realestate.onrender.com/api/searchListing?${searchQuery}`
      );
      let data = await result.json();
      //   console.log("result", result);
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListing(data.listing); //user
      setListing1(data.listing1); //admin data
      setLoading(false);
    };
    fetchData();
  }, [location.search]);

  const submitForm = (e) => {
    e.preventDefault();
    const urlPrams = new URLSearchParams();
    urlPrams.set("searchTerm", sidebar.serachTerm);
    urlPrams.set("type", sidebar.type);
    urlPrams.set("parking", sidebar.parking);
    urlPrams.set("offer", sidebar.offer);
    urlPrams.set("furnished", sidebar.furnished);
    urlPrams.set("sort", sidebar.sort);
    urlPrams.set("order", sidebar.order);
    const searchQuery = urlPrams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListing = listing.length;
    const startIndex = numberOfListing;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(
      `https://deploy-realestate.onrender.com/api/searchListing?${searchQuery}`
    );
    const data = await res.json();

    if (data.length < 9) {
      setShowMore(false);
    }
    setListing([...listing, ...data]);
  };
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={submitForm} className="flex flex-col gap-8">
          <div className="flex items-center gap-2  ">
            <label className="whitespace-nowrap font-semibold">
              Search Term
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search.."
              className="border rounded-lg p-3 w-full"
              value={sidebar.serachTerm}
              onChange={handelChange}
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handelChange}
                checked={sidebar.type === "all"}
              />
              <span>Rent and Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handelChange}
                checked={sidebar.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handelChange}
                checked={sidebar.type === "sale"}
              />
              <span>Sale</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="land"
                className="w-5"
                onChange={handelChange}
                checked={sidebar.type === "land"}
              />
              <span>Land</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handelChange}
                checked={sidebar.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenties</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handelChange}
                checked={sidebar.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handelChange}
                checked={sidebar.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handelChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value="regularPrice_desc">Price low to high</option>
              <option value="regularPrice_asc">Price high to low</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button className="text-white bg-slate-700 rounded-lg p-3 hover:opacity-95 uppercase">
            Search
          </button>
        </form>
      </div>
      <div className="text-3xl font-semibold p-3 text-slate-700 mt-3">
        <h1>Listing Results:</h1>

        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listing.length === 0 && <p>No Listing Found here</p>}
          {loading && (
            <p className=" text-xl text-slate-700 text-center w-full">
              Loading
            </p>
          )}

          {!loading &&
            listing &&
            listing.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          {!loading &&
            listing1 &&
            listing1.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
        </div>

        {showMore && (
          <button
            onClick={onShowMoreClick}
            className="text-sm text-green-700 hover:underline p-7"
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
}
