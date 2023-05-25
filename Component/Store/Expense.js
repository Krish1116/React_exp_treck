import { createSlice } from "@reduxjs/toolkit";

const initialExpState = { expenses: [], totalAmount: 0, firstTime: true };

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpState,
  reducers: {
    replaceExpense(state, action) {
      state.expenses = action.payload.expenses;
      state.totalAmount = Number(action.payload.totalAmount);
    },
    addExpense(state, action) {
      state.expenses = [...state.expenses, action.payload.expenses];
      state.totalAmount =
        Number(state.totalAmount) + Number(action.payload.totalAmount);
    },
    removeExpense(state, action) {
      state.expenses = action.payload.expenses;
      state.totalAmount = action.payload.totalAmount;
    },
    updateTotalAmount(state, action) {
      state.totalAmount = action.payload.totalAmount;
    },
  },
});
export const expenseAction = expenseSlice.actions;
export default expenseSlice.reducer;
