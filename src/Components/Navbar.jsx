import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import DropDown from "./DropDown";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import "../assets/Style/About.css";
import img from "../img/real.png";

export default function Navbar() {
  const navigate = useNavigate();
  const imgUrl =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const user = sessionStorage.getItem("users");
  const admin = sessionStorage.getItem("admin");
  const [openProfile, setOpenProfile] = useState(false);
  const isLoggedIn = user || admin;
  // console.log(openProfile);

  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    const urlPrams = new URLSearchParams(window.location.search);
    urlPrams.set("searchTerm", searchTerm);
    const searchQuery = urlPrams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    console.log(currentUser);
  });

  useEffect(() => {
    const urlPrams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlPrams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  // window.addEventListener("click", (e) => {
  //   if (e.target !== closeRef) {
  //     setOpenProfile(false);
  //     console.log("sssss", openProfile);
  //   }
  // });

  return (
    <div className="z-30">
      {/* <header className="bg-slate-200 shadow-md"> */}
      <header className="bg-[#F6F9FC] ">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
              {/* <span className="text-slate-500 text-xl">HamroSampati</span>
              <span className="text-slate-700">Realestate</span> */}
              <img
                className="h-24 
                 w-24 rounded-lg scale-90 "
                src={img}
                alt=""
              />
            </h1>
          </Link>
          <form
            onSubmit={handelSubmit}
            className="bg-slate-100 p-3 rounded-xl flex items-center"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64  "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button>
              <FaSearch className="text-slate-600" />
            </button>
          </form>

          <ul className="flex gap-4 ">
            <Link to="/">
              <li className="hover-underline-animation hiddem sm:inline text-slate-600">
                Home
              </li>
            </Link>

            <Link to="/auctionDetails">
              <li className="hiddem sm:inline text-slate-600 hover-underline-animation">
                Auction
              </li>
            </Link>
            <Link onClick={handelSubmit}>
              <li className="hiddem sm:inline text-slate-600 hover-underline-animation">
                Property
              </li>
            </Link>
            <Link to="/about">
              <li className="hiddem sm:inline text-slate-600 hover-underline-animation">
                About
              </li>
            </Link>

            {user ? (
              <>
                <Link to="/profile">
                  <img
                    className="rounded-full h-7 w-7 object-cover"
                    src={currentUser.result.avatar || imgUrl}
                    alt=""
                  />
                </Link>

                <div className="">
                  <Link>
                    <SettingsSuggestIcon
                      onClick={() => setOpenProfile((prev) => !prev)}
                      // onClick={() => setOpenProfile(true)}
                    />
                  </Link>
                  {openProfile && openProfile === true && (
                    <div className="absolute mt-[-54px] w-48 bg-white rounded-lg shadow-lg z-10">
                      <DropDown />
                    </div>
                  )}
                </div>

                <Link className="text-2xl mt-1 " to="/chat">
                  <BiSolidMessageRoundedDots className="hover:opacity-90" />
                </Link>
              </>
            ) : (
              <></>
            )}

            {admin ? (
              <>
                <Link to="/admin-dash">
                  <img
                    className="rounded-full h-7 w-7 object-cover"
                    src={imgUrl}
                    alt=""
                  />
                </Link>
                <Link className="text-2xl mt-1 " to="/chat">
                  <BiSolidMessageRoundedDots className="hover:opacity-90" />
                </Link>
              </>
            ) : (
              <></>
            )}

            {isLoggedIn ? null : (
              <>
                <Link to="/sign-in">
                  <li className=" text-slate-600 hover:underline">SignIn</li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
}
