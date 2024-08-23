import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSucess,
  SignOutUserStart,
  SignOutUserSucess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/Style/Profile-Style.css";

export default function Profile() {
  const fileRef = useRef();
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);
  const [sucessMessage, setSucessMessage] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handelFileupload(file);
    }
  }, [file]);

  const handelFileupload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handelchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match! Please try again");
      return;
    }

    try {
      dispatch(updateUserStart());
      const updateAPI = await fetch(
        `https://deploy-realestate.onrender.comapi/userProfileUpdate/${currentUser.result._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!updateAPI.ok) {
        console.log("data update failed");
      }

      const result = await updateAPI.json();
      if (!result) {
        dispatch(updateUserFailure(error.message));
        console.log("response not found");
      } else {
        console.log("Update successful:", result);
        setSucessMessage("Update User Successful !!");
      }

      dispatch(updateUserSuccess(result));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      console.log("some thing went wrong", error);
    }
  };

  const deleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      let deleteAPI = await fetch(
        `/api/userProfileDelete/${currentUser.result._id}`,
        {
          method: "DELETE",
        }
      );

      deleteAPI = await deleteAPI.json();
      if (!deleteAPI) {
        return dispatch(deleteUserFailure());
      }
      dispatch(deleteUserSucess(deleteAPI));
      sessionStorage.clear();

      navigate("/sign-in");
      toast.success(<div>Delete User Sucessfully</div>, {
        theme: "colored",
        autoClose: 1000,
      });
    } catch (error) {
      console.log("something went wrong:", error);
      dispatch(deleteUserFailure(error.message));
    }
  };

  const signOut = async () => {
    try {
      dispatch(SignOutUserStart());

      sessionStorage.clear();
      localStorage.clear();
      console.log("Local storage cleared.");

      navigate("/sign-in");
      toast.success(<div>Sign out sucessMessage</div>, {
        theme: "colored",
        autoClose: 1000,
      });
      dispatch(SignOutUserSucess());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="blur-background">
      <div className="bg-slate-50 bg-opacity-40 rounded-xl shadow-md p-6 mx-auto max-w-xl mt-4 mb-4">
        <h1 className="text-3xl font-semibold text-center mb-3">
          Profile Page
        </h1>

        <form onSubmit={handelSubmit} className="flex flex-col gap-3 ">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.result.avatar}
            alt=""
            className="rounded-full h-24 w-24 object-cover self-center mt-0"
          />

          <div className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error uploading image (must be less than 2 MB)
              </span>
            ) : filePercentage > 0 && filePercentage < 100 ? (
              <span className="text-green-600">{`Uploading ${filePercentage}%`}</span>
            ) : filePercentage === 100 ? (
              <span className="text-green-600">
                Image successfully uploaded
              </span>
            ) : (
              ""
            )}
          </div>

          <input
            className="border p-3 rounded-lg   "
            defaultValue={currentUser.result.firstName}
            onChange={handelchange}
            type="text"
            id="firstName"
            placeholder="First Name"
          />
          <input
            className="border p-3 rounded-lg "
            defaultValue={currentUser.result.lastName}
            onChange={handelchange}
            type="text"
            id="lastName"
            placeholder="Last Name"
          />
          <input
            className="border p-3 rounded-lg  "
            defaultValue={currentUser.result.email}
            onChange={handelchange}
            id="email"
            type="email"
            placeholder="Email"
            readOnly={true}
          />
          <input
            className="border p-3 rounded-lg "
            onChange={handelchange}
            id="password"
            type="password"
            placeholder="Password"
          />
          <input
            className="border p-3 rounded-lg "
            id="confirmPassword"
            onChange={handelchange}
            type="password"
            placeholder="Confirm Password"
          />

          <button
            disabled={loading}
            className="bg-orange-400 text-white rounded-lg p-3 uppercase hover:bg-slate-700"
          >
            {loading ? "Loading..." : "Update"}
          </button>

          {error && (
            <p className="text-center text-xs text-red-700 mt-1">{error}</p>
          )}
          {sucessMessage && (
            <p className="text-center text-xs text-green-600 mt-1">
              {sucessMessage}
            </p>
          )}
        </form>

        <div className="flex justify-between mt-3">
          <span onClick={deleteUser} className="text-red-600 cursor-pointer ">
            Delete Account
          </span>
          <span onClick={signOut} className="text-red-600 cursor-pointer">
            Sign out
          </span>
        </div>
      </div>
    </div>
  );
}
