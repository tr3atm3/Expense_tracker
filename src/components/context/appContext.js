import { createContext } from "react";

const appContext = createContext({
  userLoginTokenId: null,
  profileUpdated: false,
  emailVerified: false,
});

export default appContext;
