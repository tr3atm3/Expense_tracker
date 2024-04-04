import React, { useContext, useRef, useState } from "react";
import UserContactDetails from "../UserContactDetails";
import appContext from "./context/appContext";

const Home = () => {
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const ctx = useContext(appContext);

  const handleCancelBtn = () => {
    setIsProfileComplete(false);
  };
  return (
    <div className="p-4">
      <div className="flex justify-between  border-b border-solid border-gray-400 items-center shadow-lg pb-2">
        <p>Welcome To Expense Tracker</p>
        {!ctx.profileUpdated && (
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
    </div>
  );
};

export default Home;
