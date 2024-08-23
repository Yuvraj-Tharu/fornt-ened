import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGoogle } from "react-icons/fa";
export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelGoogleOauthClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const nameParts = result.user.displayName.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");

      const response = await fetch(
        "https://deploy-realestate.onrender.com/api/google",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: result.user.email,
            avatar: result.user.photoURL,
          }),
        }
      );

      if (!response.ok) {
        console.log("Failed to authenticate with Google");
      }

      const data = await response.json();
      if (!data) {
        console.log("data not found");
        // navigate("/");
      } else {
        dispatch(signInSuccess(data));
        navigate("/");

        console.log("data", data);
        sessionStorage.setItem("users", JSON.stringify(data.result));
      }
    } catch (error) {
      console.log("Failed to sign in with Google", error);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center p-2  ">
        <button onClick={handelGoogleOauthClick} className="flex gap-2">
          <FcGoogle />
          {/* <FaGoogle className="text-white" /> */}
          <h1 className="uppercase font-semibold text-slate-600">Google</h1>
        </button>
      </div>
    </>
  );
}
