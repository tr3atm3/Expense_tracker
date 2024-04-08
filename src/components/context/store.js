import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import expenseReducer from "./expenseSlice";

const appStore = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
  },
});

export default appStore;
