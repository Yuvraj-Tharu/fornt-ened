import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdLocationOn, MdBathtub } from "react-icons/md";
import { FaBed, FaParking } from "react-icons/fa";

export default function AuctionItem({ listing }) {
  const [remainingTime, setRemainingTime] = useState(null);
  useEffect(() => {
    if (listing) {
      const endTime = new Date(listing.endTime);
      calculateRemainingTime(endTime);

      const intervalId = setInterval(() => {
        calculateRemainingTime(endTime);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [listing]);

  const calculateRemainingTime = (endTime) => {
    const now = new Date();
    const difference = endTime - now;
    if (difference > 0) {
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setRemainingTime({ hours, minutes, seconds });
    } else {
      setRemainingTime(null);
    }
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };
  return (
    <>
      <div className="bg-white flex shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
        <Link to={`auctionSingleListing/${listing._id}`}>
          <img
            className="h-[300px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
            src={
              listing.imageUrl[0] ||
              "https://assets-global.website-files.com/620ec747459e13c7cf12a39e/625b10a58137b364b18df2ea_iStock-94179607.jpg"
            }
            alt=""
          />
          <div className="p-3 flex flex-col gap-2 w-full">
            <p className="truncate text-lg font-semibold text-slate-700 ">
              {listing.title}
            </p>
            <div className="flex items-center gap-1">
              <MdLocationOn className="h-4 w-4 text-green-700" />
              <p className="text-sm text-gray-600 truncate w-full">
                {listing.address}
              </p>
            </div>

            <p className="text-sm text-gray-600 line-clamp-2">
              {listing.description}
            </p>
            <p className="text-slate-500 mt-2 font-semibold flex gap-14">
              Rs {listing.MinimumPrice}
            </p>

            <div className="text-green-700 flex gap-2">
              <div className="font-bold text-xs flex gap-1">
                <FaBed className="text-lg flex text-green-700" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bedrooms`}
              </div>

              <div className="font-bold text-xs flex gap-1">
                <MdBathtub className="text-sm md-1 text-green-700" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} bath`
                  : `${listing.bathrooms} bathrooms`}
              </div>
              <div className="font-bold text-xs flex gap-1">
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaParking className="text-lg" />
                  {listing.parking ? "Parking spot" : "No Parking"}
                </li>
              </div>
            </div>
            {remainingTime && (
              <div className="text-green-900 font-semibold text-sm">
                <p>
                  Time Remaining:{" "}
                  {`${formatTime(remainingTime.hours)}:${formatTime(
                    remainingTime.minutes
                  )}:${formatTime(remainingTime.seconds)}`}{" "}
                  <br />
                  End Date: {new Date(listing.endTime).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </Link>
      </div>
    </>
  );
}
