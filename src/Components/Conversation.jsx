import React, { useEffect, useState } from "react";
import "../assets/Style/Chat.css";

export default function Conversation({ data, currentUserId, online }) {
  const ImageUrl =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const [userData, setUserData] = useState(null);
  //   console.log(userData);
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);
    getUserData(userId);
  }, []);

  const getUserData = async (userId) => {
    try {
      let response = await fetch(
        `https://deploy-realestate.onrender.com/api/getUser/${userId}`
      );
      //chat-api-ro2l.onrender.com
      https: if (response.ok) {
        let data = await response.json();
        // console.log(data);
        setUserData(data.result);
      } else {
        console.log("Failed to fetch user data");
      }
    } catch (error) {
      console.log("Internal server error: ", error);
    }
  };

  return (
    <>
      {userData && (
        <div className="follower conversation">
          <div className="flex">
            {online && <div className="online-dot "></div>}
            <img
              className="followerImage rounded-full"
              style={{ width: "50px", height: "50px" }}
              src={userData.avatar ? userData.avatar : ImageUrl}
              alt=""
            />
            <div className="name p-2" style={{ fontSize: "0.8rem" }}>
              <div>
                <span>{userData.firstName}</span>
                <span>{userData.lastName}</span>
              </div>
              <span>Online</span>
            </div>
          </div>
        </div>
      )}
      <hr className="w-40 border-solid border-gray-500" />
    </>
  );
}
