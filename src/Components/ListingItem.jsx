import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn, MdBathtub } from "react-icons/md";
import { FaBed } from "react-icons/fa";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white flex shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          className="h-[300px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
          src={
            listing.imageUrl[0] ||
            "https://assets-global.website-files.com/620ec747459e13c7cf12a39e/625b10a58137b364b18df2ea_iStock-94179607.jpg"
          }
          alt=""
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold  text-slate-700 ">
            {listing.title}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full font-sans">
              {listing.address}
            </p>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 font-sans ">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold   text-xs flex gap-4">
            Rs{" "}
            {listing.offer
              ? (
                  +listing.regularPrice -
                  +listing.regularPrice * (listing.discountPrice / 100)
                ).toLocaleString("en-RS")
              : listing.regularPrice.toLocaleString("en-RS")}
            {listing.type === "rent" && "/month"}
            {listing.offer && (
              <p className="text-xs">
                <span className="text-xs line-through ">Regular Price: </span>
                <span className="line-through text-sm">
                  Rs{listing.regularPrice}
                </span>
              </p>
            )}
            {listing.type === "land" && "/Aana"}
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
          </div>
        </div>
      </Link>
    </div>
  );
}
