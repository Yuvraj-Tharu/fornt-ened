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

export default function forgetPassword() {
  const [otp, SetOTP] = useState("");
  const [NewPassword, SetNewPassword] = useState("");
  const [NewConfirmPassword, SetConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const ResetPasswordAPi = async () => {
    try {
      if (NewPassword !== NewConfirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }
      if (NewPassword.length < 5) {
        setErrorMessage("Password must be at least 5 characters long");
        return;
      }

      let data = await fetch(
        "https://github.com/Yuvraj-Tharu/Chat-APP-Repo.git/api/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp, NewPassword, NewConfirmPassword }),
        }
      );

      data = await data.json();
      // console.log("api otp", data);
      if (data) {
        if (data.otp === otp) {
          toast.success(<div>Password reset Sucessfully</div>, {
            theme: "colored",
          });
          navigate("/sign-in");
        } else {
          setErrorMessage("OTP not match, Please try again");
        }
      } else {
        setErrorMessage("Please enter valid OTP");
      }
    } catch (error) {
      console.log("some thing went wrong", error);
    }
  };

  return (
    <>
      <MDBCard className="mt-40 w-2/6 mx-auto bg-transparent border border-gray-300 shadow-lg rounded-md p-6">
        <MDBCardBody>
          <MDBCardTitle className="text-2xl font-semibold mb-4 text-slate-500">
            Reset Password
          </MDBCardTitle>
          <MDBCardText>
            <MDBInput
              className="w-full py-2 px-3 border border-orange-400 text-slate-500 rounded-md my-3"
              label="Enter OTP"
              id="otpInput"
              type="password"
              value={otp}
              onChange={(e) => {
                SetOTP(e.target.value);
              }}
            />
          </MDBCardText>
          <MDBCardText>
            <MDBInput
              className="w-full py-2 px-3 border border-orange-400 text-slate-500 rounded-md my-3"
              label="Enter New Password"
              id="otpInput"
              type="password"
              value={NewPassword}
              onChange={(e) => {
                SetNewPassword(e.target.value);
              }}
            />
          </MDBCardText>
          <MDBCardText>
            <MDBInput
              className="w-full py-2 px-3 border border-orange-400 text-slate-500 rounded-md my-3"
              label="Enter New ConfirmPassword"
              id="otpInput"
              type="password"
              value={NewConfirmPassword}
              onChange={(e) => {
                SetConfirmPassword(e.target.value);
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
            onClick={ResetPasswordAPi}
          >
            Verify
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </>
  );
}
