import React, { useEffect, useState } from "react";
import AuctionItem from "./AuctionItem";

export default function AuctionCard() {
  const [auctionListing, setAuctionListing] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let data = await fetch(
        "https://deploy-realestate.onrender.com/api/showAuction"
      );
      data = await data.json();
      setAuctionListing(data);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const handleShowMore = () => {
    setShowMore(true);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 bg-[#FFFFFF]">
        <div className="flex flex-wrap  gap-4 bg-[#FFFFFF]">
          {auctionListing
            .slice(0, showMore ? auctionListing.length : 6)
            .map((listing) => (
              <AuctionItem listing={listing} key={listing._id} />
            ))}
        </div>

        {!showMore && auctionListing.length > 6 && (
          <button
            className="text-sm text-green-700 hover:underline p-7"
            onClick={handleShowMore}
          >
            Show more
          </button>
        )}
      </div>
    </>
  );
}
