import { useReducer } from "react";
import appContext from "./appContext";

const defaultState = {
  userLoginTokenId: null,
  profileUpdated: false,
  emailVerified: false,
};
const reducer = (state, action) => {
  if (action.type === "REMOVEID") {
    return {
      ...state,
      userLoginTokenId: null,
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
      userLoginTokenId: action.value,
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

  const saveUserTokenId = (id) => {
    dispatch({
      type: "TOKENID",
      value: id,
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
    userLoginTokenId: allState.userLoginTokenId,
    emailVerified: allState.emailVerified,
    profileUpdated: allState.profileUpdated,
    updatingProfile: updatingProfile,
    verifyEmail: verifyEmail,
    saveUserTokenId: saveUserTokenId,
    removeUserTokenId: removeUserTokenId,
  };
  return (
    <appContext.Provider value={contextValue}>
      {props.children}
    </appContext.Provider>
  );
};

export default AppContextProvider;
