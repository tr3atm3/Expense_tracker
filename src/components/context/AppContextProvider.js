import { useReducer } from "react";
import appContext from "./appContext";

const defaultState = {
  userLoginInfo: null,
  profileUpdated: false,
  emailVerified: false,
};
const reducer = (state, action) => {
  if (action.type === "REMOVEID") {
    return {
      ...state,
      userLoginInfo: null,
    };
  }
  if (action.type === "VERIFYEMAIL") {
    return {
      ...state,
      emailVerified: true,
    };
  }
  if (action.type === "UPDATEPROFILE") {
    return {
      ...state,
      profileUpdated: action.value,
    };
  }
  if (action.type === "TOKENID") {
    return {
      ...state,
      userLoginInfo: {
        loginID: action.value.loginId,
        email: action.value.email,
      },
    };
  }
  return defaultState;
};

const AppContextProvider = (props) => {
  const [allState, dispatch] = useReducer(reducer, defaultState);

  const removeUserTokenId = () => {
    dispatch({
      type: "REMOVEID",
    });
  };

  const saveUserInfo = (value) => {
    dispatch({
      type: "TOKENID",
      value: value,
    });
  };
  const updatingProfile = () => {
    dispatch({
      type: "UPDATEPROFILE",
      value: true,
    });
  };

  const verifyEmail = () => {
    dispatch({
      type: "VERIFYEMAIL",
    });
  };

  const contextValue = {
    userLoginInfo: allState.userLoginInfo,
    emailVerified: allState.emailVerified,
    profileUpdated: allState.profileUpdated,
    updatingProfile: updatingProfile,
    verifyEmail: verifyEmail,
    saveUserInfo: saveUserInfo,
    removeUserTokenId: removeUserTokenId,
  };
  return (
    <appContext.Provider value={contextValue}>
      {props.children}
    </appContext.Provider>
  );
};

export default AppContextProvider;
