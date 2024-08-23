import React, { useEffect, useState } from "react";

import Sidebar from "../../Components/Sidebar";

export default function ShowCurrentUser() {
  const [userData, setUserData] = useState();

  useEffect(() => {
    showUserData();
  }, []);

  const showUserData = async () => {
    try {
      let result = await fetch("https://deploy-realestate.onrender.com/api/allUsers");
      if (result) {
        result = await result.json();
        setUserData(result);
      }
    } catch (error) {
      console.log(error, "sth went wrong");
    }
  };

  return (
    <>
      <div className="flex ">
        <div className="  h-full">
          <Sidebar />
        </div>

        <div id="customers" className="p-4 grow flex flex-col text-center ">
          <h1 className="font-semibold text-slate-700 text-3xl mb-3 my-4  ">
            Users
          </h1>
          <table>
            <thead>
              <tr>
                <th className="">S.N</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Avatar</th>
                <th>isVerified</th>

                {/* <th className="">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.map((data, index) => (
                  <tr key={data._id}>
                    <td>{index + 1}</td>
                    <td>{data.firstName}</td>
                    <td>{data.lastName}</td>
                    <td>{data.email}</td>
                    <td>
                      <img className="h-24 w-24" src={data.avatar} alt="" />
                    </td>

                    <td>{data.isVerified === true ? "Yes" : "No"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
