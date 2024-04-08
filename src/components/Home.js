import React, { useState } from "react";
import UserContactDetails from "../UserContactDetails";

import UserExpenses from "./UserExpenses";
import { useSelector, useDispatch } from "react-redux";
import { verifyEmail } from "./context/authSlice";

const Home = () => {
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleCancelBtn = () => {
    setIsProfileComplete(false);
  };

  const verifyingEmail = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC7sVHD3PsWo_Lma3A_MJKwkcCo-BjiFm8",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: auth.userLoginTokenId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(response.message);
      }
      console.log(data);
      dispatch(verifyEmail());
      alert("Verification link sent to the email.");
    } catch (err) {
      alert(err);
    }
  };
  const handleEmailVerification = () => {
    verifyingEmail();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between  border-b border-solid border-gray-400 items-center shadow-lg pb-2">
        <p>Welcome To Expense Tracker</p>
        {!auth.emailVerified && (
          <button
            className="bg-gray-400 px-2 py-1 rounded-lg"
            onClick={handleEmailVerification}
          >
            Verify Email
          </button>
        )}
        {!auth.profileUpdated && (
          <div className="flex bg-orange-200 px-2 rounded-lg max-w-[500px]">
            <p>
              {isProfileComplete
                ? "Your Profile is 64% completed. A complete Profile has higher chances of landing a job."
                : "Your Profile is incomplete"}
            </p>
            <button
              className="text-blue-500 ml-2"
              onClick={() => setIsProfileComplete(true)}
            >
              Complete Now
            </button>
          </div>
        )}
      </div>
      {isProfileComplete && (
        <UserContactDetails handleCancel={handleCancelBtn} />
      )}
      <UserExpenses />
    </div>
  );
};

export default Home;
