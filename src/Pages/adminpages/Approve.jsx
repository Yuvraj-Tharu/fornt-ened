import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import "../../assets/Style/table.css";
import { toast } from "react-toastify";
import { TextField, Button } from "@mui/material";

export default function Approve() {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [cancelText, setCancelText] = useState("");

  console.log(cancelText);

  useEffect(() => {
    showData();
  }, []);

  const showData = async () => {
    try {
      let result = await fetch(
        "https://deploy-realestate.onrender.com/api/admin-approve"
      );
      if (result) {
        result = await result.json();
      } else {
        setMessage("No verify  Found");
      }

      setData(result.listings);
    } catch (error) {
      console.log("sth went wrong", error);
    }
  };

  const approveListing = async (id) => {
    try {
      let result = await fetch(
        `https://deploy-realestate.onrender.com/api/admin-verify/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      result = await result.json();
      if (result) {
        showData();
      }
      // console.log("dsds", result);
      navigate("/approve-user/Property");
    } catch (error) {
      console.log(error);
    }
  };

  const notApproveListing = async (id) => {
    try {
      let result = await fetch(
        `https://deploy-realestate.onrender.com/api/admin-cancel/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ CancelledMessage: cancelText }),
        }
      );

      result = await result.json();

      if (result) {
        setCancelText("");
        showData();
      }
      if (result.isCanceled === true) {
        toast.info(<div>Not Approved user Listing</div>, {
          theme: "colored",
          autoClose: 1000,
        });
      }
      navigate("/approve-user/Property");
    } catch (error) {
      console.log("sth went wrong with the server", error);
    }
  };

  const handelnot = () => {
    setShowInput(true);
  };

  const handleCancel = () => {
    setShowInput(false);
  };
  return (
    <>
      <div className="flex">
        <div className="h-full">
          <Sidebar />
        </div>

        <div id="customers" className="p-4 grow flex flex-col text-center ">
          <h1 className="font-semibold text-slate-700 text-3xl mb-3 my-4 ">
            Approve User Property Listing
          </h1>
          {message && <p className="text-red-700 text-sm">{error}</p>}

          <table className="">
            <thead>
              <tr>
                <th className="">S.N</th>
                <th>Title</th>
                <th>Image</th>
                <th>Address</th>
                <th>Regular Price</th>
                <th>Discount %</th>
                <th>Status</th>
                <th>View Details</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((data, index) => (
                  <tr key={data._id}>
                    <td>{index + 1}</td>
                    <td>{data.title}</td>
                    <td>
                      <Link to={`/listing/${data._id}`}>
                        <img
                          className="h-16 w-16 object-contain rouned-lg items-center "
                          src={data.imageUrl[0]}
                          alt=""
                        />
                      </Link>
                    </td>
                    <td>{data.address}</td>
                    <td>{data.regularPrice}</td>
                    <td>{data.discountPrice}</td>
                    <td>
                      {data.isVerified === false ? "Not Verify" : "Verify"}
                    </td>
                    <td>
                      <Link to={`/listing/${data._id}`}>
                        <button className="text-green-700 hover:underline">
                          Click here
                        </button>
                      </Link>
                    </td>
                    <td className="flex flex-col gap-3">
                      <button
                        // onClick={() => {
                        //   notApproveListing(data._id);
                        // }}
                        onClick={handelnot}
                        className="text-red-700"
                      >
                        {data.isCanceled === false ? "Cancel" : "Cancelled"}
                      </button>

                      <button
                        onClick={() => {
                          approveListing(data._id);
                        }}
                        className="text-green-700 "
                      >
                        Approved
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {showInput && data && (
            <div className="w-full mt-4 flex justify-center items-center">
              <div className="mt-10 flex flex-col gap-10  w-[70vh]">
                <TextField
                  className=" "
                  id="standard-basic"
                  label="Reason for cancellation"
                  variant="standard"
                  value={cancelText}
                  onChange={(e) => setCancelText(e.target.value)}
                />

                <div className="flex justify-between gap-4">
                  {data.map((data, i) => (
                    <button
                      onClick={() => {
                        notApproveListing(data._id);
                      }}
                      class="group relative inline-flex items-center overflow-hidden rounded-full border-2 border-slate-600 px-12 py-3 text-lg font-medium text-slate-600 hover:bg-gray-50 hover:text-white"
                    >
                      <span class="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-slate-600 opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
                      <span class="ease absolute right-0 flex h-10 w-10 translate-x-full transform items-center justify-start duration-500 group-hover:-translate-x-2">
                        <svg
                          class="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </span>
                      <span class="relative transform duration-700 group-hover:-translate-x-3">
                        Submit
                      </span>
                    </button>
                  ))}
                  <button
                    onClick={handleCancel}
                    class="group relative inline-flex items-center overflow-hidden rounded-full border-2 border-slate-600 px-12 py-3 text-lg font-medium text-slate-600 hover:bg-gray-50 hover:text-white"
                  >
                    <span class="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-slate-600 opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
                    <span class="ease absolute right-0 flex h-10 w-10 translate-x-full transform items-center justify-start duration-500 group-hover:-translate-x-2">
                      <svg
                        class="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </span>
                    <span class="relative transform duration-700 group-hover:-translate-x-3">
                      Back
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
