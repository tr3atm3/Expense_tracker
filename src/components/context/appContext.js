import { createContext } from "react";

const appContext = createContext({
  userLoginTokenId: null,
});

export default appContext;
