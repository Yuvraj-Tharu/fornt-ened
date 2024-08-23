import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateListiing() {
  const [file, setFile] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [error, setError] = useState(false);
  const [loding, setLoding] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();

  // console.log(currentUser.result._id, "sdsadsad");
  const [formData, setFormData] = useState({
    imageUrl: [],
    title: "",
    description: "",
    address: "",
    type: "sale",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const imageUpload = (e) => {
    setUploading(true);
    setImageUploadError(false);
    if (file.length > 0 && file.length + formData.imageUrl.length < 7) {
      const promise = [];
      for (let i = 0; i < file.length; i++) {
        promise.push(storeImage(file[i]));
      }
      Promise.all(promise)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrl: formData.imageUrl.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("image upload failed");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images only");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      imageUrl: formData.imageUrl.filter((_, i) => i !== index),
    });
  };

  const submit = (e) => {
    if (
      e.target.id === "rent" ||
      e.target.id === "sale" ||
      e.target.id === "land"
    ) {
      setFormData({ ...formData, type: e.target.id });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if (+formData.regularPrice < +formData.discountPrice) {
        setError("Discount price must be lower than regular price");
        return;
      }

      if (formData.imageUrl < 1) {
        setError("Image must be upload atleast one");
        return;
      }
      setLoding(true);
      setError(false);
      const api = await fetch(
        `https://deploy-realestate.onrender.com/api/updateListing/${params.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            userRef: currentUser.result._id,
          }),
        }
      );

      const data = await api.json();
      // console.log(data._id, "sdsd");
      // console.log("data------", data);
      setLoding(false);
      if (!data) {
        setError("data is not found");
        return;
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError("internal error, please try again", error);
      console.log(error);
      setLoding(false);
    }
  };

  useEffect(() => {
    displayListing();
  }, []);

  const displayListing = async () => {
    try {
      console.log(params.id);
      let result = await fetch(
        `https://deploy-realestate.onrender.com/api/getListing/${params.id}`
      );

      result = await result.json();

      if (!result) {
        console.log("result is  not found");
      }

      setFormData(result.data);
    } catch (error) {}
  };

  return (
    <motion.main
      className="p-3 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-semibold text-center my-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Update Listing
      </motion.h1>
      <motion.form
        onSubmit={submitForm}
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.div
          className="flex flex-col gap-3 flex-1 "
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.input
            className="appearance-none block  bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            id="title"
            placeholder="Title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            value={formData.title}
            onChange={submit}
            required
          />
          <motion.textarea
            className="appearance-none block  bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            id="description"
            placeholder="Description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            value={formData.description}
            onChange={submit}
            required
          />
          <motion.input
            className="appearance-none block  bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            id="address"
            placeholder="Address"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            value={formData.address}
            onChange={submit}
            required
          />

          <motion.div
            className="flex gap-3 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={submit}
                checked={formData.type === "sale"}
              />
              <span>sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={submit}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="land"
                className="w-5"
                onChange={submit}
                checked={formData.type === "land"}
              />
              <span>Land</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={submit}
                checked={formData.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={submit}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={submit}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </motion.div>
          <motion.div
            className="flex flex-wrap gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min={1}
                max={11}
                className="p-3  text-gray-700 border rounded-lg"
                onChange={submit}
                value={formData.bedrooms}
                required
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min={1}
                max={11}
                className="p-3  text-gray-700 border rounded-lg"
                onChange={submit}
                value={formData.bathrooms}
                required
              />
              <p>Bath</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min={1}
                max={1000000000000}
                className="p-3  text-gray-700 border rounded-lg"
                onChange={submit}
                value={formData.regularPrice}
                required
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">(Rs / months)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min={0}
                  max={100000000}
                  className="p-3  text-gray-700 border rounded-lg"
                  onChange={submit}
                  value={formData.discountPrice}
                />

                <div className="flex flex-col items-center">
                  <p>Discounted Price</p>
                  <span className="text-xs">(Rs / months)</span>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col flex-1"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          <motion.p
            className="font-semibold my-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2 }}
          >
            Images:
            <span className="font-normal text-gray-700 ml-2">
              The first image will be the cover image (max-6)
            </span>
          </motion.p>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.2 }}
          >
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              onChange={(e) => setFile(e.target.files)}
              id="images"
              accept="image/*"
              multiple
            />

            <motion.button
              type="button"
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
              onClick={imageUpload}
              disabled={uploading}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.4 }}
            >
              {uploading ? "Uploading..." : "Upload"}
            </motion.button>
          </motion.div>
          <p className="text-sm mt-1 text-red-700">
            {imageUploadError && imageUploadError}
          </p>

          {formData.imageUrl.length > 0 &&
            formData.imageUrl.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt=""
                  className="h-20 w-20 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="p-3 text-red-700 rounded uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loding || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg my-3 disabled:opacity-65 "
          >
            {loding ? "Updating..." : "Update Listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </motion.div>
      </motion.form>
    </motion.main>
  );
}
