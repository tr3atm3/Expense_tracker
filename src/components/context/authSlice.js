import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userLoginInfo: null,
    profileUpdated: false,
    emailVerified: false,
  },
  reducers: {
    removeUserTokenId(state) {
      return {
        ...state,
        userLoginInfo: null,
      };
    },
    saveUserInfo(state, action) {
      console.log(action);
      return {
        ...state,
        userLoginInfo: {
          loginId: action.payload.loginId,
          email: action.payload.email,
        },
      };
    },
    updatingProfile(state, action) {
      return {
        ...state,
        profileUpdated: action.payload,
      };
    },
    verifyEmail(state) {
      return {
        ...state,
        emailVerified: true,
      };
    },
  },
});
export const { removeUserTokenId, saveUserInfo, updatingProfile, verifyEmail } =
  authSlice.actions;
export default authSlice.reducer;
