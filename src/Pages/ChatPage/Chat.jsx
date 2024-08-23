import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Conversation from "../../Components/Conversation";
import ChatBox from "./ChatBox";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser.result;
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    getChats();
  }, [user._id]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io("https://chat-api-ro2l.onrender.com");

    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
    });
  }, []);

  const getChats = async () => {
    try {
      let data = await fetch(
        `https://deploy-realestate.onrender.com/api/getChat/${user._id}`
      );
      data = await data.json();
      setChats(data);
    } catch (error) {
      console.log("sth went to wrong", error);
    }
  };

  const checkOnlineStatus = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };

  return (
    <div className="flex h-screen mt-2">
      <div className="w-1/4 bg-gray-500 p-4 overflow-y-auto rounded-lg">
        <h2 className="font-semibold text-2xl mb-4 text-white">Chats</h2>
        <div className="space-y-4 text-white">
          {chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => setCurrentChat(chat)}
              className="cursor-pointer"
            >
              <Conversation
                data={chat}
                currentUserId={user._id}
                online={checkOnlineStatus(chat)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-3/4 bg-white p-4">
        {currentChat ? (
          <ChatBox
            chat={currentChat}
            currentUserId={user._id}
            setSendMessage={setSendMessage}
            receiveMessage={receiveMessage}
          />
        ) : (
          <h1 className="mt-20 font-semibold text-4xl text-center">
            No chat selected
          </h1>
        )}
      </div>
    </div>
  );
}
