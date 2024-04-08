import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    premiumBuyed: false,
    darkMode: false,
  },
  reducers: {
    setPremiumTrue(state) {
      return {
        ...state,
        premiumBuyed: true,
      };
    },
    toggleMode(state) {
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    },
  },
});

export const { toggleMode, setPremiumTrue } = themeSlice.actions;
export default themeSlice.reducer;
