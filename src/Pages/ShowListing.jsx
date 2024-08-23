import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../assets/Style/table.css";

export default function ShowListing() {
  const [userListing, setUserListing] = useState([]);
  const [listingError, setListingError] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  // console.log(userListing);

  useEffect(() => {
    showlisting();
  }, []);

  const showlisting = async () => {
    try {
      const api = await fetch(
        `https://deploy-realestate.onrender.com/api/listing/${currentUser.result._id}`
      );
      let result = await api.json();
      if (!result) {
        return setListingError(true);
      }
      setUserListing(result);
      // console.log("data ", result);
    } catch (error) {
      console.log("some thing went wrong", error);
      setListingError(true);
    }
  };

  const deleteListing = async (id) => {
    try {
      let result = await fetch(
        `https://deploy-realestate.onrender.com/api/deleteListing/${id}`,
        {
          method: "DELETE",
        }
      );

      result = await result.json();

      if (result) {
        showlisting();
      }
    } catch (error) {
      console.log("some thing went wrong", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 mx-6">
      <h1 className="text-center  my-7 text-3xl font-semibold">
        Your Property Listing
      </h1>

      <table id="customers" className="">
        <thead>
          <tr>
            <th>S.N</th>
            <th>Title</th>
            <th>Image</th>
            <th>Address</th>
            <th>Regular Price</th>
            <th>Discount %</th>
            <th>Verify</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userListing &&
            userListing.length > 0 &&
            userListing.map((listing, index) => (
              <tr key={listing._id}>
                <td>{index + 1}</td>
                <td>{listing.title}</td>
                <td>
                  {" "}
                  <Link to={`/listing/${listing._id}`}>
                    <img
                      className="h-16 w-16 object-contain rouned-lg items-center "
                      src={listing.imageUrl[0]}
                      alt=""
                    />
                  </Link>
                </td>

                <td>{listing.address}</td>
                <td>{listing.regularPrice}</td>
                <td>{listing.discountPrice}</td>
                <td>
                  {listing.isVerified === true ? "Approved" : "Not Approved"}
                </td>
                <td>
                  {listing.isCanceled === true
                    ? listing.CancelledMessage
                    : "Verified"}
                </td>

                <td className="flex flex-col  items-center gap-3">
                  <button
                    onClick={() => {
                      deleteListing(listing._id);
                    }}
                    className="text-red-700"
                  >
                    Delete
                  </button>
                  <Link to={`/updateListing/${listing._id}`}>
                    <button className="text-green-700 ">
                      {listing.isCanceled === true ? "Edit Now" : "Edit"}
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
