import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import ListingItem from "../Components/ListingItem";

import Footer from "./Footer";
import "../assets/Style/About.css";
import "../assets/Style/Button.css";
import image from "../img/house2.png";
import { FaHouse } from "react-icons/fa6";
export default function Home() {
  const [videoSource, setVideoSource] = useState(0);
  const [offerListing, setOfferListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [rentListing, setrentListing] = useState([]);
  const [landListing, setLandListing] = useState([]);

  const [adminofferListing, setAdminOfferListing] = useState([]);
  const [adminsaleListing, setAdminSaleListing] = useState([]);
  const [adminrentListing, setAdminrentListing] = useState([]);
  const [adminlandListing, setAdminLandListing] = useState([]);

  const videos = [
    "/videos/video1.mp4",
    "/videos/video2.mp4",
    "/videos/video3.mp4",
    "/videos/video4.mp4",
  ];
  const [ref, inView] = useInView();
  const [animationComplete, setAnimationComplete] = useState(false);

  const changeVideo = () => {
    const nextSource = (videoSource + 1) % videos.length;
    setVideoSource(nextSource);
  };

  useEffect(() => {
    fetchOfferData();
  }, []);

  const fetchOfferData = async () => {
    try {
      let fetchData = await fetch(
        "https://deploy-realestate.onrender.com/api/searchListing/?offer=true&limit=3"
      );
      fetchData = await fetchData.json();
      setOfferListing(fetchData.listing);
      setAdminOfferListing(fetchData.listing1);
      fetchRentData();
      // console.log(fetchData);
    } catch (error) {
      console.log("internal error: " + error);
    }
  };

  const fetchRentData = async () => {
    try {
      let fetchData = await fetch(
        "https://deploy-realestate.onrender.com/api/searchListing/?type=rent&limit=3"
      );
      fetchData = await fetchData.json();
      setrentListing(fetchData.listing);
      setAdminrentListing(fetchData.listing1);
      fetchSaleData();
    } catch (error) {
      console.log("internal error: " + error);
    }
  };

  const fetchSaleData = async () => {
    try {
      let fetchData = await fetch(
        "https://deploy-realestate.onrender.com/api/searchListing/?type=sale&limit=3"
      );
      fetchData = await fetchData.json();
      setSaleListing(fetchData.listing);
      setAdminSaleListing(fetchData.listing1);
      fetchLandData();
    } catch (error) {
      console.log("internal error: " + error);
    }
  };

  const fetchLandData = async () => {
    try {
      let fetchData = await fetch(
        "https://deploy-realestate.onrender.com/api/searchListing/?type=land&limit=3"
      );
      fetchData = await fetchData.json();
      setLandListing(fetchData.listing);
      setAdminLandListing(fetchData.listing1);
    } catch (error) {
      console.log("internal error: " + error);
    }
  };

  return (
    <div className="bg-[#FFFFFF] ">
      {/* <div className="shape mt-10  ">
        <div className="shape-2  bg-slate-700  opacity-75  "></div>
        <div className="shape-3  bg-slate-700 opacity-75   "></div>
      </div> */}

      {/* <div className=" min-h[100vh] right-0 ">
        <div className="relative ml-[203px]  h-[500px] overflow-hidden z-20 rounded-xl p-5 w-[70%]">
          <video
            autoPlay
            loop
            muted
            className="absolute top-[207px] left-0 w-full h-[647px] object-cover transform -translate-y-1/2 rounded-xl  "
            src={videos[videoSource]}
            onClick={changeVideo}
          ></video>
        </div>
      </div> */}

      <div className=" bg-[#F2F6F7] h-full w-full min-h-[40vw] ">
        <div className="flex justify-between">
          <h1 className="  text-6xl  font-serif  mt-[100px]   ml-[220px]">
            <div className="flex gap-3 font-serif">
              <FaHouse className="text-2xl text-slate-600 mt-1" />
              <h1 className="text-slate-700 text-3xl mb-2 font-serif ">
                Real Estate Agency
              </h1>
            </div>
            <span className="text-slate-500 font-serif ">
              Find your Dream <br />
            </span>{" "}
            <span className="text-slate-700 font-serif">House with us</span>{" "}
            <br />
            <span className="flex gap-3 mt-2">
              <span className=" border-[1px] border-black ml-2 h-26  "></span>
              <span className="text-sm font-serif text-justify">
                Embark on a journey with us as we unlock the door to your
                dreams, one home at a time. Experience the transformative power
                of real estate, where each property becomes a chapter in the
                story of your life, and every key symbolizes new beginnings and
                endless possibilities. Let us guide you through this exciting
                adventure, turning your aspirations into reality, one door at a
                time. we have wide range of property
              </span>
            </span>
            <Link to="/about">
              <button className="ml-2 mt-8 group relative inline-flex items-center overflow-hidden rounded-full border-2 border-slate-600 px-12 py-3 text-lg font-medium text-slate-700 hover:bg-gray-50 hover:text-white">
                <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-slate-700 opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
                <span className="ease absolute right-0 flex h-10 w-10 translate-x-full transform items-center justify-start duration-500 group-hover:-translate-x-2">
                  <svg
                    className="h-5 w-5"
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
                  Make An Enquiry
                </span>
              </button>
            </Link>
          </h1>

          <img className="" src={image} alt="" />
        </div>
        {/* <div className="flex justify-center items-center h-[20vh] w-full mt-60px p-3 bg-red-300 ">
          <div className=" flex border-2 h-[15vh] w-[130vh] gap-10 border-sky-700">
            <div className="flex items-center gap-5">
              <label className="font-semibold">Sort:</label>
              <select id="sort_order" className="border rounded-lg p-3">
                <option value="regularPrice_desc">Price low to high</option>
                <option value="regularPrice_asc">Price high to low</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
         
            <div className="flex items-center gap-2">
              <label className="font-semibold">Property Type:</label>
              <select id="sort_order" className=" rounded-lg p-3">
                <option value="regularPrice_desc">Price low to high</option>
                <option value="regularPrice_asc">Price high to low</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
          </div>
        </div> */}
      </div>
      {/* <div className="bg-[#F2F6F7] h-[20vw]"></div> */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 z-50">
        <h1 className="  text-6xl  font-serif  mt-3  ">
          <span className="text-slate-500  ">
            Our choice of <br />
          </span>{" "}
          <span className="text-slate-700">popular real estate</span> <br />
        </h1>
        {offerListing && offerListing.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-serif text-slate-700 ">
                Recent Offer
              </h2>
              <Link
                className="text-sm text-blue-500 font-serif  hover-underline-animation"
                to={"/search?offer=true"}
              >
                Show more Offers
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              {offerListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
              {adminofferListing && adminofferListing.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {adminofferListing.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {saleListing && saleListing.length > 0 && (
          <div>
            <div className="my-3 ">
              <h2 className="text-2xl font-serif text-slate-700">
                Recent Places for Sale
              </h2>
              <Link
                className="text-sm font-serif text-blue-500 hover-underline-animation"
                to={"/search?type=sale"}
              >
                Show more Places for Sale
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 ">
              {saleListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
              {adminsaleListing && adminsaleListing.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {adminsaleListing.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {rentListing && rentListing.length > 0 && (
          <div>
            <div className="my-3 ">
              <h2 className="text-2xl font-serif text-slate-700">
                Recent Places for Rent
              </h2>
              <Link
                className="text-sm font-serif text-blue-500 hover-underline-animation"
                to={"/search?type=rent"}
              >
                Show more Places for Rent
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              {rentListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
              {adminrentListing && adminrentListing.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {adminrentListing.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {landListing && landListing.length > 0 && (
          <div>
            <div className="my-3 ">
              <h2 className="text-2xl font-serif text-slate-700 ">
                Recent Places for Land
              </h2>
              <Link
                className="text-sm font-serif text-blue-500 hover-underline-animation"
                to={"/search?type=land"}
              >
                Show more Places for Land
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              {landListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
              {adminlandListing && adminlandListing.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {adminlandListing.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="conatiner bg-[#EDF9F9] flex gap-28" ref={ref}>
        <motion.div
          className="w-full min-h-[30vw] p-5 ml-[229px]"
          initial={{ opacity: 0, y: -100 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          onAnimationComplete={() => setAnimationComplete(true)}
        >
          <div className="h-[23vw] w-[36vw]  bg-yellow-400 absolute mt-4"></div>
          <img
            className="absolute ml-4 "
            src="https://media.istockphoto.com/id/1591572504/photo/cheerful-businesswomen-shaking-hands-in-meeting-room.jpg?s=612x612&w=0&k=20&c=mo5VjVyA-t4ydS6ZjJVxaUSi0v9KVbJV_Go5EOF_B8M="
            alt=""
          />
        </motion.div>
        <motion.div
          className="h-[30vw] w-full  mr-20 flex flex-col gap-3 "
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          style={{ pointerEvents: animationComplete ? "auto" : "none" }}
        >
          <motion.h1
            className="text-4xl mt-[100px] font-serif "
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            style={{ pointerEvents: animationComplete ? "auto" : "none" }}
          >
            Modern spaces and premium design
          </motion.h1>
          <motion.p
            className="font-extralight font-serif "
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            style={{ pointerEvents: animationComplete ? "auto" : "none" }}
          >
            Straight, uncluttered lines define the architectural and interior
            design, creating a sense of simplicity and sophistication.
          </motion.p>
          <motion.p
            className="font-extralight font-serif"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            style={{ pointerEvents: animationComplete ? "auto" : "none" }}
          >
            -High-quality Materials
          </motion.p>
          <motion.p
            className="font-extralight font-serif"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            style={{ pointerEvents: animationComplete ? "auto" : "none" }}
          >
            -Neutral Color Palette
          </motion.p>
          <motion.p
            className="font-extralight font-serif"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            style={{ pointerEvents: animationComplete ? "auto" : "none" }}
          >
            -Minimalist Furnishings
          </motion.p>
        </motion.div>
      </div>

      <div className="container ml-[255px] mt-[100px] mb-[100px] w-[140vh]">
        <h1 className="text-5xl font-serif">
          How It works? <br /> Find a perfect home
        </h1>
        <div className="flex gap-4 my-2 overflow-hidden ">
          <div className="mt-5 w-[15vw] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48.2"
              height="47.463"
              viewBox="0 0 48.2 47.463"
            >
              <g transform="translate(0.1 0.101)">
                <g transform="translate(6.132)">
                  <g transform="translate(5.593 15.246)">
                    <path
                      d="M763.611,150.617H739.874a.445.445,0,0,1-.446-.446v-15.2a.446.446,0,1,1,.891,0v14.75h22.846V134.949a.446.446,0,1,1,.891,0v15.222A.445.445,0,0,1,763.611,150.617Z"
                      transform="translate(-739.428 -134.503)"
                      stroke="#000"
                      stroke-width="0.2"
                    ></path>
                    <g transform="translate(8.343 5.226)">
                      <path
                        d="M756.281,151.143a.446.446,0,0,1-.446-.446v-9.441h-6.157V150.7a.446.446,0,1,1-.891,0v-9.886a.446.446,0,0,1,.446-.446h7.048a.445.445,0,0,1,.446.446V150.7A.445.445,0,0,1,756.281,151.143Z"
                        transform="translate(-748.787 -140.365)"
                        stroke="#000"
                        stroke-width="0.2"
                      ></path>
                    </g>
                  </g>
                  <path
                    d="M765.891,135.614a.448.448,0,0,1-.282-.1l-14.587-11.883-14.587,11.883a.445.445,0,0,1-.627-.064l-2.553-3.135a.444.444,0,0,1,.064-.627L750.735,117.5a.441.441,0,0,1,.332-.1l.034,0a.431.431,0,0,1,.209.093l17.417,14.187a.447.447,0,0,1,.064.627l-2.554,3.135A.447.447,0,0,1,765.891,135.614Zm-14.869-13a.443.443,0,0,1,.282.1l14.523,11.83,1.992-2.444-16.8-13.681-16.8,13.681,1.992,2.444,14.523-11.83A.442.442,0,0,1,751.022,122.611Z"
                    transform="translate(-733.154 -117.401)"
                    stroke="#000"
                    stroke-width="0.2"
                  ></path>
                </g>
                <g transform="translate(0 9.871)">
                  <g transform="translate(35.92)">
                    <path
                      d="M778.2,157.413a.446.446,0,0,1-.446-.446V131.787a2.425,2.425,0,0,0-2.421-2.422h-8.321a.446.446,0,0,1,0-.891h8.321a3.317,3.317,0,0,1,3.313,3.314v25.181A.446.446,0,0,1,778.2,157.413Z"
                      transform="translate(-766.569 -128.473)"
                      stroke="#000"
                      stroke-width="0.2"
                    ></path>
                  </g>
                  <path
                    d="M770.963,161.379H729.589a3.317,3.317,0,0,1-3.313-3.313v-26.28a3.317,3.317,0,0,1,3.313-3.314h8.563a.446.446,0,0,1,0,.891h-8.563a2.425,2.425,0,0,0-2.421,2.422v26.28a2.424,2.424,0,0,0,2.421,2.421h41.375a2.424,2.424,0,0,0,2.421-2.421.446.446,0,1,1,.891,0A3.316,3.316,0,0,1,770.963,161.379Z"
                    transform="translate(-726.276 -128.473)"
                    stroke="#000"
                    stroke-width="0.2"
                  ></path>
                  <g transform="translate(0 27.102)">
                    <path
                      d="M770.963,164.678H729.589a3.473,3.473,0,0,1-3.313-3.607V159.32a.446.446,0,0,1,.446-.446H773.83a.446.446,0,0,1,.446.446v1.752A3.473,3.473,0,0,1,770.963,164.678Zm-43.8-4.913v1.306a2.584,2.584,0,0,0,2.421,2.715h41.375a2.584,2.584,0,0,0,2.421-2.715v-1.306Z"
                      transform="translate(-726.276 -158.874)"
                      stroke="#000"
                      stroke-width="0.2"
                    ></path>
                  </g>
                  <g transform="translate(20.565 32.015)">
                    <path
                      d="M749.79,169.762a.445.445,0,0,1-.446-.446v-4.485a.446.446,0,1,1,.891,0v4.485A.446.446,0,0,1,749.79,169.762Z"
                      transform="translate(-749.344 -164.385)"
                      stroke="#000"
                      stroke-width="0.2"
                    ></path>
                    <g transform="translate(5.98)">
                      <path
                        d="M756.5,169.762a.445.445,0,0,1-.446-.446v-4.485a.446.446,0,0,1,.891,0v4.485A.446.446,0,0,1,756.5,169.762Z"
                        transform="translate(-756.052 -164.385)"
                        stroke="#000"
                        stroke-width="0.2"
                      ></path>
                    </g>
                  </g>
                  <g transform="translate(17.104 36.5)">
                    <path
                      d="M758.809,170.307h-12.9a.446.446,0,1,1,0-.891h12.9a.446.446,0,1,1,0,.891Z"
                      transform="translate(-745.462 -169.416)"
                      stroke="#000"
                      stroke-width="0.2"
                    ></path>
                  </g>
                  <g transform="translate(23.173 29.787)">
                    <path
                      d="M753.478,162.777h-.762a.446.446,0,1,1,0-.891h.762a.446.446,0,1,1,0,.891Z"
                      transform="translate(-752.27 -161.886)"
                      stroke="#000"
                      stroke-width="0.2"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
            <h1 className="text-2xl font-serif">Find real estate</h1>
            <p>
              I seek through various means, perhaps to be involved in his
              desired Greek-style sweetness.
            </p>
          </div>
          <h1 className=" border ml-2 mt-12 "></h1>
          <div className="mt-5 w-[15vw] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="59.013"
              height="41.588"
              viewBox="0 0 59.013 41.588"
            >
              <g transform="translate(0.181 0.15)">
                <g transform="translate(4.306 5.52)">
                  <g transform="translate(0 7.255)">
                    <g transform="translate(0 14.136)">
                      <path
                        d="M455.521,657.389H417.714a.828.828,0,0,1-.8-.883V643.773h-5.022a.381.381,0,1,1,0-.761h5.4a.38.38,0,0,1,.381.381v13.112c0,.06.016.122.043.122h37.807c.03,0,.044-.071.044-.122V643.393a.38.38,0,0,1,.381-.381h5.4a.381.381,0,0,1,0,.761h-5.021v12.732A.828.828,0,0,1,455.521,657.389Z"
                        transform="translate(-411.506 -643.012)"
                        stroke="#000"
                        stroke-width="0.3"
                      ></path>
                    </g>
                    <g transform="translate(15.137)">
                      <path
                        d="M439.417,636.588h-7.652a.381.381,0,0,1-.381-.381v-4.884a.381.381,0,0,1,.134-.29l7.652-6.494a.381.381,0,0,1,.628.29v11.378A.381.381,0,0,1,439.417,636.588Zm-7.272-.761h6.891V625.652l-6.891,5.848Z"
                        transform="translate(-431.384 -624.449)"
                        stroke="#000"
                        stroke-width="0.3"
                      ></path>
                      <g transform="translate(11.534 0.001)">
                        <path
                          d="M454.563,636.588h-7.652a.381.381,0,0,1-.381-.381V624.83a.381.381,0,0,1,.627-.29l7.652,6.494a.379.379,0,0,1,.134.29v4.883A.381.381,0,0,1,454.563,636.588Zm-7.272-.762h6.891V631.5l-6.891-5.848Z"
                          transform="translate(-446.53 -624.45)"
                          stroke="#000"
                          stroke-width="0.3"
                        ></path>
                      </g>
                    </g>
                    <g transform="translate(31.163 18.369)">
                      <path
                        d="M459.13,658.591a.38.38,0,0,1-.381-.381v-8.879h-5.559v8.879a.381.381,0,1,1-.762,0v-9.26a.38.38,0,0,1,.381-.381h6.321a.38.38,0,0,1,.381.381v9.26A.38.38,0,0,1,459.13,658.591Z"
                        transform="translate(-452.429 -648.57)"
                        stroke="#000"
                        stroke-width="0.3"
                      ></path>
                    </g>
                    <g transform="translate(11.953 17.492)">
                      <path
                        d="M432.5,654.593h-4.92a.38.38,0,0,1-.381-.381V647.8a.38.38,0,0,1,.381-.381h4.92a.381.381,0,0,1,.381.381v6.413A.381.381,0,0,1,432.5,654.593Zm-4.539-.761h4.159v-5.651h-4.159Z"
                        transform="translate(-427.202 -647.419)"
                        stroke="#000"
                        stroke-width="0.3"
                      ></path>
                      <g transform="translate(9.684)">
                        <path
                          d="M445.219,654.593H440.3a.381.381,0,0,1-.381-.381V647.8a.381.381,0,0,1,.381-.381h4.919a.38.38,0,0,1,.381.381v6.413A.38.38,0,0,1,445.219,654.593Zm-4.539-.761h4.158v-5.651h-4.158Z"
                          transform="translate(-439.919 -647.419)"
                          stroke="#000"
                          stroke-width="0.3"
                        ></path>
                      </g>
                    </g>
                  </g>
                  <g transform="translate(35.88)">
                    <path
                      d="M465.25,624.373a.38.38,0,0,1-.381-.381v-7.11a1.1,1.1,0,0,0-.963-1.2h-3.556a1.1,1.1,0,0,0-.966,1.2v1.892a.381.381,0,1,1-.761,0v-1.892a1.857,1.857,0,0,1,1.728-1.96h3.556a1.856,1.856,0,0,1,1.725,1.96v7.11A.38.38,0,0,1,465.25,624.373Z"
                      transform="translate(-458.623 -614.922)"
                      stroke="#000"
                      stroke-width="0.3"
                    ></path>
                  </g>
                </g>
                <g transform="translate(0)">
                  <path
                    d="M460.866,636.009a.381.381,0,0,1-.241-.085l-25.448-20.73-25.448,20.73a.385.385,0,0,1-.279.083.377.377,0,0,1-.257-.139l-3.257-4a.381.381,0,0,1,.055-.535l28.943-23.576a.382.382,0,0,1,.283-.083l.024,0a.379.379,0,0,1,.179.079l28.942,23.576a.381.381,0,0,1,.055.535l-3.257,4a.377.377,0,0,1-.257.139Zm-54.1-4.324,2.775,3.408,25.393-20.685a.381.381,0,0,1,.481,0l25.393,20.685,2.775-3.408-28.409-23.142Z"
                    transform="translate(-405.851 -607.674)"
                    stroke="#000"
                    stroke-width="0.3"
                  ></path>
                </g>
              </g>
            </svg>
            <h1 className="text-2xl font-serif">Meet relator</h1>
            <p>
              I take on the endeavor to seek through, hoping to engage in his
              wishful thinking, which is scarcely of Greek sweetness
            </p>
          </div>
          <h1 className=" border ml-2 mt-12 "></h1>
          <div className="mt-5 w-[15vw] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35.25"
              height="47.562"
              viewBox="0 0 35.25 47.562"
            >
              <g transform="translate(0.15 0.15)">
                <g transform="translate(0 5.089)">
                  <path
                    d="M919.788,409.393H888.1a1.631,1.631,0,0,1-1.63-1.629V368.849a1.632,1.632,0,0,1,1.632-1.628H919.79a1.631,1.631,0,0,1,1.63,1.628v38.915A1.632,1.632,0,0,1,919.788,409.393ZM888.1,368.066a.786.786,0,0,0-.787.784v38.915a.787.787,0,0,0,.786.785h31.688a.786.786,0,0,0,.787-.785V368.849a.785.785,0,0,0-.785-.784Z"
                    transform="translate(-886.47 -367.221)"
                    stroke="#000"
                    stroke-width="0.3"
                  ></path>
                </g>
                <g transform="translate(3.831 7.164)">
                  <path
                    d="M910.73,405.977H892.7a1.693,1.693,0,0,1-1.691-1.691V371.37a1.693,1.693,0,0,1,1.691-1.692h23.9a1.694,1.694,0,0,1,1.692,1.692v27.372a.419.419,0,0,1-.131.306l-7.142,6.812A.421.421,0,0,1,910.73,405.977ZM892.7,370.523a.847.847,0,0,0-.846.847v32.916a.847.847,0,0,0,.846.846h17.864l6.888-6.571V371.37a.848.848,0,0,0-.848-.847Z"
                    transform="translate(-891.006 -369.678)"
                    stroke="#000"
                    stroke-width="0.3"
                  ></path>
                  <g transform="translate(5.67 8.237)">
                    <path
                      d="M913.526,380.276H898.141a.422.422,0,0,1,0-.845h15.385a.422.422,0,0,1,0,.845Z"
                      transform="translate(-897.719 -379.431)"
                      stroke="#000"
                      stroke-width="0.3"
                    ></path>
                  </g>
                  <g transform="translate(5.67 13.474)">
                    <path
                      d="M913.526,386.477H898.141a.422.422,0,0,1,0-.845h15.385a.422.422,0,0,1,0,.845Z"
                      transform="translate(-897.719 -385.632)"
                      stroke="#000"
                      stroke-width="0.3"
                    ></path>
                  </g>
                  <g transform="translate(5.67 18.711)">
                    <path
                      d="M913.526,392.678H898.141a.422.422,0,0,1,0-.845h15.385a.422.422,0,0,1,0,.845Z"
                      transform="translate(-897.719 -391.833)"
                      stroke="#000"
                      stroke-width="0.3"
                    ></path>
                  </g>
                  <g transform="translate(5.67 23.948)">
                    <path
                      d="M913.526,398.879H898.141a.422.422,0,0,1,0-.845h15.385a.422.422,0,0,1,0,.845Z"
                      transform="translate(-897.719 -398.034)"
                      stroke="#000"
                      stroke-width="0.3"
                    ></path>
                  </g>
                  <g transform="translate(18.992 28.736)">
                    <path
                      d="M913.915,411.265a.422.422,0,0,1-.422-.422v-5.485a1.648,1.648,0,0,1,1.591-1.655h6.092a.422.422,0,0,1,0,.845h-6.088a.8.8,0,0,0-.751.807v5.488A.422.422,0,0,1,913.915,411.265Z"
                      transform="translate(-913.493 -403.703)"
                      stroke="#000"
                      stroke-width="0.3"
                    ></path>
                  </g>
                </g>
                <g transform="translate(9.252)">
                  <path
                    d="M913.448,371.6h-15.6a.421.421,0,0,1-.422-.422v-4.468a3.26,3.26,0,0,1,3.256-3.257h1.057v-.566a1.691,1.691,0,0,1,1.689-1.689h4.441a1.691,1.691,0,0,1,1.689,1.689v.566h1.057a3.26,3.26,0,0,1,3.256,3.257v4.468A.421.421,0,0,1,913.448,371.6Zm-15.178-.845h14.756v-4.045a2.414,2.414,0,0,0-2.411-2.412h-1.48a.422.422,0,0,1-.422-.422v-.988a.845.845,0,0,0-.844-.845h-4.441a.845.845,0,0,0-.844.845v.988a.421.421,0,0,1-.422.422h-1.48a2.414,2.414,0,0,0-2.411,2.412Z"
                    transform="translate(-897.425 -361.195)"
                    stroke="#000"
                    stroke-width="0.3"
                  ></path>
                </g>
              </g>
            </svg>
            <h1 className="text-2xl font-serif">Documents</h1>
            <p>
              I undertake the search for knowledge, through which, at his
              desire, I hope to learn; what is scarcely of Greek sweetness
            </p>
          </div>
          <h1 className=" border ml-2  mt-12 "></h1>
          <div className="mt-5 w-[15vw] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="41.148"
              height="47.62"
              viewBox="0 0 41.148 47.62"
            >
              <g transform="translate(0.15 0.149)">
                <g transform="translate(23.259 24.808)">
                  <path
                    d="M1204.794,527.211h-9.435a.4.4,0,0,1-.405-.405v-5.357l-.547.445a.4.4,0,0,1-.3.089.406.406,0,0,1-.273-.147l-1.015-1.246a.4.4,0,0,1,.058-.571l6.923-5.64a.392.392,0,0,1,.3-.088.294.294,0,0,1,.046.008.394.394,0,0,1,.165.079l6.923,5.64a.4.4,0,0,1,.147.273.4.4,0,0,1-.088.3l-1.016,1.246a.4.4,0,0,1-.57.058l-.516-.42v5.332A.4.4,0,0,1,1204.794,527.211Zm-9.03-.811h8.625v-5.78a.405.405,0,0,1,.661-.314l.862.7.5-.618-6.356-5.177-6.355,5.177.5.618.893-.728a.406.406,0,0,1,.661.315Z"
                    transform="translate(-1192.73 -514.288)"
                    stroke="#000"
                    stroke-width="0.3"
                  ></path>
                </g>
                <g transform="translate(0 8.069)">
                  <path
                    d="M1172,532.831l-3.4-3.542V509.377a8.237,8.237,0,0,1-2.13-1.534,8.321,8.321,0,0,1,5.884-14.206h0a8.312,8.312,0,0,1,3.753,15.74v4.343l-1.047,1.418,1.091,2.5-1.1,2.121,1.128,1.924-1.111,1.571,1.1,2.006-1.106,1.754,1.15,1.992Zm-2.591-3.867,2.63,2.738,3.147-2.852-1.068-1.85,1.112-1.764-1.114-2.033,1.1-1.557-1.09-1.858,1.124-2.176-1.124-2.578,1.167-1.581v-4.589l.234-.109a7.537,7.537,0,1,0-6.355,0l.234.109Z"
                    transform="translate(-1164.037 -493.638)"
                    stroke="#000"
                    stroke-width="0.3"
                  ></path>
                  <g transform="translate(7.401 16.213)">
                    <rect
                      width="0.811"
                      height="19.958"
                      stroke="#000"
                      stroke-width="0.3"
                    ></rect>
                  </g>
                </g>
                <g transform="translate(7.912)">
                  <path
                    d="M1196.909,497.733h-.811v-6.5a6.964,6.964,0,0,0-7.157-6.737h-7.178a6.963,6.963,0,0,0-7.155,6.737v4.229h-.811v-4.229a7.773,7.773,0,0,1,7.966-7.547h7.178a7.775,7.775,0,0,1,7.967,7.547Z"
                    transform="translate(-1173.798 -483.684)"
                    stroke="#000"
                    stroke-width="0.3"
                  ></path>
                </g>
                <g transform="translate(5.445 10.864)">
                  <path
                    d="M1173.627,502.832a2.872,2.872,0,1,1,2.873-2.873A2.876,2.876,0,0,1,1173.627,502.832Zm0-4.934a2.062,2.062,0,1,0,2.062,2.061A2.064,2.064,0,0,0,1173.627,497.9Z"
                    transform="translate(-1170.754 -497.087)"
                    stroke="#000"
                    stroke-width="0.3"
                  ></path>
                </g>
                <g transform="translate(20.332 13.644)">
                  <path
                    d="M1209.23,529.945h-19.706a.405.405,0,0,1-.405-.405V508.965a.409.409,0,0,1,.05-.195l4.4-8.044a.4.4,0,0,1,.356-.211h10.914a.4.4,0,0,1,.355.211l4.4,8.044a.409.409,0,0,1,.05.195v20.574A.405.405,0,0,1,1209.23,529.945Zm-19.3-.811h18.9V509.068l-4.231-7.741h-10.433l-4.231,7.741Z"
                    transform="translate(-1189.119 -500.516)"
                    stroke="#000"
                    stroke-width="0.3"
                  ></path>
                </g>
              </g>
            </svg>
            <h1 className="text-2xl font-serif">Take the keys</h1>
            <p>
              I take the seekers through, hoping to indulge in his desire, which
              is scarcely of Greek sweetness
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
