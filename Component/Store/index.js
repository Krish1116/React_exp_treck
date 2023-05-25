import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./Expense";
import themeReducer from "./themePremium";

const store = configureStore({
  reducer: {
    expense: expenseReducer,
    theme: themeReducer,
  },
});

export default store;
