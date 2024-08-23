import React, { useState } from "react";
import "../assets/Style/Signup-Style.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OAuth from "../Components/OAuth/OAuth";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onTrigger = async () => {
    try {
      setLoading(true);

      if (password === confirmPassword) {
        if (password.length < 5) {
          console.warn("Password must be at least 5 characters long");
          setError("Password must be at least 5 characters long");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "https://deploy-realestate.onrender.com/api/signup-user",
          {
            method: "POST",
            body: JSON.stringify({
              firstName,
              lastName,
              email,
              password,
              confirmPassword,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.ok) {
          const result = await response.json();
          sessionStorage.setItem(
            "signup-user",
            JSON.stringify(result.result.email)
          );
          toast.info(<div>Please Check your Email !!</div>, {
            theme: "colored",
          });
          navigate("/verify/otp");
        } else {
          const result = await response.json();

          if (result.error && result.error.includes("duplicate key error")) {
            setError("User with this email already exists");
          } else {
            setError("Signup failed. Please try again.");
          }
        }
      } else {
        setError("Password and Confirm Password do not match");
      }
    } catch (error) {
      console.error("An error occurred during signup:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MDBContainer
        fluid
        className=" p-4 background-radial-gradient overflow-hidden"
      >
        <MDBRow className="align-items-center">
          <MDBCol md="6" className="text-center text-md-start mb-4 mb-md-0">
            <h1
              className="my-4 display-4 fw-bold ls-tight"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              The best offer <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                for your Real-estate
              </span>
            </h1>

            <p className="px-3 text-sm" style={{ color: "hsl(218, 81%, 85%)" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              itaque accusantium odio, soluta, corrupti aliquam quibusdam
              tempora at cupiditate quis eum maiores libero veritatis? Dicta
              facilis sint aliquid ipsum atque?
            </p>
          </MDBCol>

          <MDBCol md="6" className="position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute
            shadow-5-strong"
            ></div>
            <MDBCard className="my-5 bg-glass">
              <MDBCardBody className="p-3 p-md-5">
                <MDBRow className="mb-3">
                  <MDBCol xs="12" md="6" className="mb-3">
                    <MDBInput
                      label="First name"
                      id="form1"
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </MDBCol>

                  <MDBCol xs="12" md="6" className="mb-3">
                    <MDBInput
                      label="Last name"
                      id="form2"
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBInput
                  label="Email"
                  id="form3"
                  type="email"
                  className="mb-3"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <MDBInput
                  label="Password"
                  id="form4"
                  type="password"
                  className="mb-3"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <MDBInput
                  label="Confirm Password"
                  id="form5"
                  type="password"
                  className="mb-3"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />

                <MDBBtn
                  onClick={onTrigger}
                  disabled={loading}
                  className="w-100 mb-3 bg-orange-400 hover:bg-slate-700"
                  size="md"
                >
                  {loading ? "Loading..." : " Sign up"}
                </MDBBtn>
                <OAuth />
                {error && (
                  <p className="text-center text-xs text-red-500 mt-2">
                    {error}
                  </p>
                )}

                <p className="text-center mt-2 text-xs">
                  Have an account?
                  <Link
                    to="/sign-in"
                    className="text-orange-400 hover:text-slate-700"
                  >
                    {" "}
                    {loading ? "wait..." : "Click here..."}
                  </Link>
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
