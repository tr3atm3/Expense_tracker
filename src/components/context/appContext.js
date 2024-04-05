import { createContext } from "react";

const appContext = createContext({
  userLoginInfo: null,
  profileUpdated: false,
  emailVerified: false,
});

export default appContext;
