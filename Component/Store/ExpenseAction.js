import { expenseAction } from "./Expense";

export const addingExpense = (expenseItem) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `https://expensetracker-d6e2d-default-rtdb.firebaseio.com/Expenses.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expenseItem),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("Expense added Successfully");
        const newData = {
          id: data.name,
          ...expenseItem,
        };
        dispatch(
          expenseAction.addExpense({
            expenses: newData,
            totalAmount: newData.amount,
          })
        );
      } else {
        throw data.error;
      }
    } catch (err) {
      console.log(err);
    }
  };
};
