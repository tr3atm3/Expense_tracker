import { createContext } from "react";

const appContext = createContext({
  userLoginTokenId: null,
  profileUpdated: false,
});

export default appContext;
