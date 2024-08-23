import React, { useState } from "react";
import {
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function OTPVerify() {
  const [otp, SetOTP] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  // console.log(otp);

  const APIfetch = async () => {
    try {
      let response = await fetch(
        `https://deploy-realestate.onrender.com/api/activate-User`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            otp,
          }),
        }
      );

      response = await response.json();

      if (response && response.existingOTP !== otp) {
        setErrorMessage("OTP not matched !!");
      } else {
        setErrorMessage("");

        toast.success(<div>OTP verify !! please login </div>, {
          theme: "colored",
        });
        navigate("/sign-in");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  return (
    <>
      <MDBCard className="mt-40 w-2/6 mx-auto bg-transparent border border-gray-300 shadow-lg rounded-md p-6">
        <MDBCardBody>
          <MDBCardTitle className="text-2xl font-semibold mb-4 text-slate-500">
            Verify OTP
          </MDBCardTitle>
          <MDBCardText>
            <MDBInput
              className="w-full py-2 px-3 border border-orange-400 text-slate-500 rounded-md"
              label="Enter OTP"
              id="otpInput"
              type="password"
              value={otp}
              onChange={(e) => {
                SetOTP(e.target.value);
              }}
            />
            {errorMessage && (
              <p className="text-center text-xs text-red-500 mt-2">
                {errorMessage}
              </p>
            )}
          </MDBCardText>
          <MDBBtn
            className="mt-4 h-10 w-full bg-orange-400 text-white hover:bg-slate-600 focus:outline-none focus:border-slate-700 focus:ring focus:ring-blue-200"
            onClick={APIfetch}
          >
            Verify
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </>
  );
}
