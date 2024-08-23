import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Signup from "./Pages/Signup";
import SignIn from "./Pages/SignIn";
import OTPVerify from "./Pages/OTPVerify";
import ForgetPassword from "./Pages/forgetPassword";
import PrivateComponent from "./Components/PrivateComponent";
import PrivateComponentADmin from "./Components/PrivateComponentADmin";
import CreateListiing from "./Pages/CreateListiing";
import ShowListing from "./Pages/ShowListing";
import UpdateListiing from "./Pages/UpdateListing";
import Listing from "./Pages/Listing";
import Search from "./Pages/Search";
import AdminPage from "./Pages/AdminPage";
import Approve from "./Pages/adminpages/Approve";
import ShowCurrentUser from "./Pages/adminpages/ShowCurrentUser";
import AdminListing from "./Pages/adminpages/AdminListing";
import AdminsingleListing from "./Pages/adminpages/AdminSingleListing";
import ShowAdminListing from "./Pages/adminpages/ShowAdminListing";
import UpdateAdminListiing from "./Pages/adminpages/UpdateAdminListing";

import Chat from "./Pages/ChatPage/Chat";
import EmiCalculator from "./Pages/EmiCalculator";
import AuctionListing from "./AuctionComponent/AuctionListing";
import ShowSingleAuctionListing from "./AuctionComponent/ShowSingleAuctionListing";
// import AuctionItem from "./AuctionComponent/AuctionItem";
import AuctionCard from "./AuctionComponent/AuctionCard";
import ShowAuctionTable from "./AuctionComponent/ShowAuctionTable";
import UpdateAuction from "./AuctionComponent/UpdateAuction";
// import UserParticipate from "./AuctionComponent/UserParticipate";
import NewContainer from "./Pages/NewContainer";
import Footer from "./Pages/Footer";
import UnitConverter from "./Pages/UnitConverter";

function App() {
  return (
    <div>
      <style>
        @import
        url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
      </style>
      <BrowserRouter>
        <Navbar />

        <ToastContainer />

        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/creatingListing" element={<CreateListiing />} />
            <Route path="/showUserlisting" element={<ShowListing />} />
            <Route path="/updateListing/:id" element={<UpdateListiing />} />
            {/* <Route
              path="/user/auction/participate"
              element={<UserParticipate />}
            /> */}
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="/n" element={<NewContainer />} />

          <Route path="/about" element={<About />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/verify/otp" element={<OTPVerify />} />
          <Route path="/forget/password" element={<ForgetPassword />} />
          <Route path="/listing/:id" element={<Listing />} />
          <Route path="/search" element={<Search />} />

          <Route path="/chat" element={<Chat />} />
          <Route path="/emiCalculator" element={<EmiCalculator />} />
          <Route
            path="/auctionDetails/auctionSingleListing/:id"
            element={<ShowSingleAuctionListing />}
          />
          <Route path="/auctionDetails" element={<AuctionCard />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/unitconverter" element={<UnitConverter />} />

          <Route element={<PrivateComponentADmin />}>
            <Route path="/admin-dash" element={<AdminPage />} />
            <Route path="/approve-user/Property" element={<Approve />} />
            <Route path="/auction" element={<AuctionListing />} />
            <Route path="/show/auction" element={<ShowAuctionTable />} />
            <Route
              path="/updateAuctionListing/:id"
              element={<UpdateAuction />}
            />

            <Route path="/add-adminProperty" element={<AdminListing />} />
            <Route
              path="/admin-showSingleListing/:id"
              element={<AdminsingleListing />}
            />
            <Route path="/showAdminProperty" element={<ShowAdminListing />} />
            <Route
              path="/showAllCurrent-User/details"
              element={<ShowCurrentUser />}
            />

            <Route
              path="/updateAdminListing/:id"
              element={<UpdateAdminListiing />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
