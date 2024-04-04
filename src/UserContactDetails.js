import React, { useContext, useRef } from "react";
import appContext from "./components/context/appContext";

const UserContactDetails = ({ handleCancel }) => {
  const fullName = useRef(null);
  const profilePhotoUrl = useRef(null);
  const ctx = useContext(appContext);

  console.log(ctx.userLoginTokenId);

  const updateProfile = async () => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC7sVHD3PsWo_Lma3A_MJKwkcCo-BjiFm8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.userLoginTokenId,
          displayName: fullName.current.value,
          photoUrl: profilePhotoUrl.current.value,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    alert("Profile Updated");
  };

  const handleUpdateBtn = (e) => {
    e.preventDefault();
    updateProfile();
    handleCancel();
    ctx.updatingProfile();
    fullName.current.value = "";
    profilePhotoUrl.current.value = "";
  };
  return (
    <div className="w-[80%] mt-6 mx-auto border-b border-gray-300 pb-4 ">
      <div className="flex w-[full] justify-between mb-8">
        <h1 className="text-2xl font-bold">Contact Details</h1>
        <button
          className="text-red-600 border border-red-700 py-1 px-3 rounded-lg"
          onClick={() => handleCancel()}
        >
          Cancel
        </button>
      </div>

      <form className=" w-[90%]" onSubmit={handleUpdateBtn}>
        <div className="flex justify-between mb-8 items-center">
          <label>Full Name:</label>
          <input
            type="text"
            className=" rounded-lg border border-gray-400 w-[30%] p-2"
            ref={fullName}
          />
          <label>Profile Photo URL:</label>
          <input
            type="text"
            className="rounded-lg border border-gray-400 w-[30%] p-2"
            ref={profilePhotoUrl}
          />
        </div>
        <button className="bg-red-500 py-1 px-3 text-white rounded-lg">
          Update
        </button>
      </form>
    </div>
  );
};

export default UserContactDetails;
