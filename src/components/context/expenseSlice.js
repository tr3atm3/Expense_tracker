import { createSlice } from "@reduxjs/toolkit";
const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenseList: [],
    totalExpenses: 0,
  },
  reducers: {
    setExpenseList(state, action) {
      return {
        expenseList: [...state.expenseList, action.payload],
        totalExpenses:
          Number(state.totalExpenses) + Number(action.payload.amount),
      };
    },
    deleteExpenseItem(state, action) {
      const newList = state.expenseList.filter(
        (item) => item.id !== action.payload
      );
      const [currentItem] = state.expenseList.filter(
        (item) => item.id === action.payload
      );
      console.info(currentItem);

      return {
        expenseList: newList,
        totalExpenses: Number(state.totalExpenses) - Number(currentItem.amount),
      };
    },
  },
});

export const { setExpenseList, deleteExpenseItem } = expenseSlice.actions;

export default expenseSlice.reducer;
