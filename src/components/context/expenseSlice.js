import { createSlice } from "@reduxjs/toolkit";
const expenseSlice = createSlice({
  name: "expenses",
  initialState: [],
  reducers: {
    setExpenseList(state, action) {
      return [...state, action.payload];
    },
    deleteExpenseItem(state, action) {
      const newList = state.filter((item) => item.id !== action.payload);
      return newList;
    },
  },
});

export const { setExpenseList, deleteExpenseItem } = expenseSlice.actions;

export default expenseSlice.reducer;
