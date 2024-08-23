import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaHouseChimney, FaBuildingUser } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { BsFillHouseAddFill } from "react-icons/bs";
import { FaCalculator } from "react-icons/fa6";
import { RiAuctionFill, RiAuctionLine } from "react-icons/ri";

import { SignOutUserSucess } from "../redux/user/userSlice";
export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    toast.success(<div>Logout Sucessfully!! </div>, {
      theme: "colored",
      autoClose: 1000,
    });
    dispatch(SignOutUserSucess());
    navigate("/");
  };
  return (
    <>
      <div className="flex h-screen">
        <div className="bg-slate-700 w-64 flex-none">
          <div className="p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin-dash"
                  className="block text-gray-300 hover:bg-gray-700 px-4 py-2 rounded "
                >
                  <h1 className="flex gap-1">
                    <MdSpaceDashboard />
                    Dashboard
                  </h1>
                </Link>
              </li>
              <li>
                <Link
                  to="/auction"
                  className="block text-gray-300 hover:bg-gray-700 px-4 py-2 rounded"
                >
                  <h1 className="flex gap-1">
                    <RiAuctionFill />
                    Auction
                  </h1>
                </Link>
              </li>
              <li>
                <Link
                  to="/show/auction"
                  className="block text-gray-300 hover:bg-gray-700 px-4 py-2 rounded"
                >
                  <h1 className="flex gap-1">
                    <RiAuctionLine />
                    Show Auction
                  </h1>
                </Link>
              </li>

              <li>
                <Link
                  to="/emiCalculator"
                  className="block text-gray-300 hover:bg-gray-700 px-4 py-2 rounded"
                >
                  <h1 className="flex gap-1">
                    <FaCalculator />
                    EMI calculator
                  </h1>
                </Link>
              </li>
              <li>
                <Link
                  to="/showAllCurrent-User/details"
                  className="block text-gray-300 hover:bg-gray-700 px-4 py-2 rounded"
                >
                  <h1 className="flex gap-1">
                    <FaUsers />
                    Customers
                  </h1>
                </Link>
              </li>

              <li>
                <Link
                  to="/add-adminProperty"
                  className="block text-gray-300 hover:bg-gray-700 px-4 py-2 rounded"
                >
                  <h1 className="flex gap-1">
                    <BsFillHouseAddFill />
                    Add Property
                  </h1>
                </Link>
              </li>
              <li>
                <Link
                  to="/showAdminProperty"
                  className="block text-gray-300 hover:bg-gray-700 px-4 py-2 rounded"
                >
                  <h1 className="flex gap-1">
                    <FaBuildingUser />
                    Show Property
                  </h1>
                </Link>
              </li>
              <li>
                <Link
                  to="/approve-user/Property"
                  className="block text-gray-300 hover:bg-gray-700 px-4 py-2 rounded"
                >
                  <h1 className="flex gap-1">
                    <FaBuildingUser />
                    Approve Properties
                  </h1>
                </Link>
              </li>

              <li>
                <Link
                  to={"/"}
                  onClick={logout}
                  className="block text-gray-300 hover:bg-gray-700 px-4 py-2 rounded"
                >
                  <h1 className="flex gap-1">
                    <IoIosLogOut />
                    Log out
                  </h1>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
