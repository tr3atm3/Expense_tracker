import { useReducer } from "react";
import appContext from "./appContext";

const defaultState = {
  userLoginTokenId: null,
  profileUpdated: false,
};
const reducer = (state, action) => {
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

  const contextValue = {
    userLoginTokenId: allState.userLoginTokenId,
    profileUpdated: allState.profileUpdated,
    updatingProfile: updatingProfile,
    saveUserTokenId: saveUserTokenId,
  };
  return (
    <appContext.Provider value={contextValue}>
      {props.children}
    </appContext.Provider>
  );
};

export default AppContextProvider;
