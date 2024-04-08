import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import expenseReducer from "./expenseSlice";
import themeReducer from "./themeSlice";

const appStore = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    theme: themeReducer,
  },
});

export default appStore;
