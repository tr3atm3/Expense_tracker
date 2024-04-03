import { useReducer } from "react";
import appContext from "./appContext";

const defaultState = {
  userLoginTokenId: null,
};
const reducer = (state, action) => {
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

  const contextValue = {
    userLoginTokenId: allState.userLoginTokenId,
    saveUserTokenId: saveUserTokenId,
  };
  return (
    <appContext.Provider value={contextValue}>
      {props.children}
    </appContext.Provider>
  );
};

export default AppContextProvider;
