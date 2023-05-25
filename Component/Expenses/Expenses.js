import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import "./Expenses.css";
import { useNavigate } from "react-router-dom";
import ExpenseItem from "./ExpenseItem";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../Store/Expense";
import { addingExpense } from "../Store/ExpenseAction";

const Expenses = () => {
  const amoutInputref = useRef();
  const desInputRef = useRef();
  const [selectedCategory, setSelectedCategory] = useState("Category");
  // const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const expenses = useSelector((state) => state.expense.expenses);
  const totalAmount = useSelector((state) => state.expense.totalAmount);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const expHandler = useCallback(
    async (e) => {
      e.preventDefault();
      const enteredAmount = amoutInputref.current.value;
      const enteredDes = desInputRef.current.value;

      console.log(enteredAmount, enteredDes, selectedCategory);

      const newExpenses = {
        amount: enteredAmount,
        description: enteredDes,
        category: selectedCategory,
      };

      dispatch(addingExpense(newExpenses));

      const updatedTotalAmount = Number(totalAmount);
      dispatch(
        expenseAction.updateTotalAmount({ totalAmount: updatedTotalAmount })
      );

      amoutInputref.current.value = "";
      desInputRef.current.value = "";
      setSelectedCategory("");
      // try {
      //   const res = await fetch(
      //     `https://expensetracker-d6e2d-default-rtdb.firebaseio.com/Expenses.json`,
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(newExpenses),
      //     }
      //   );
      //   const data = await res.json();
      //   if (res.ok) {
      //     alert("Expenses added Successfully");
      //     amoutInputref.current.value = "";
      //     desInputRef.current.value = "";
      //     setSelectedCategory("");
      //     // await fetchExpense
      //   } else {
      //     throw data.error;
      //   }
      // } catch (err) {
      //   console.log(err.message);
      // }

      // setExpenses((prev) => [...prev, newExpenses]);
    },
    [dispatch, selectedCategory, totalAmount]
  );

  const goHomeHandler = () => {
    navigate("/home");
  };

  // it won't remove the printed data from the screen when you refresh the page.
  const fetchExp = useCallback(async () => {
    try {
      const res = await fetch(
        `https://expensetracker-d6e2d-default-rtdb.firebaseio.com/Expenses.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        let updatedTotalAmount = 0;
        const newData = [];
        for (let key in data) {
          newData.push({ id: key, ...data[key] });
          updatedTotalAmount += Number(data[key].amount);
        }
        dispatch(
          expenseAction.replaceExpense({
            expenses: newData,
            totalAmount: updatedTotalAmount,
          })
        );
      } else {
        throw data.error;
      }
    } catch (err) {
      console.log(err.message);
    }
  }, [dispatch]);

  const deleteItem = useCallback(
    async (item) => {
      // setExpenses((prevExpenses) => {
      //   const updatedExpenses = prevExpenses.filter((exp) => exp.id !== item.id);
      //   return updatedExpenses;
      // });
      console.log(totalAmount);
      const updatedTotalAmount = Number(totalAmount) - Number(item.amount);
      const updatedExpenses = expenses.filter((exp) => {
        return exp.id !== item.id;
      });
      console.log("afterdeleted", updatedExpenses);

      dispatch(
        expenseAction.removeExpense({
          expenses: updatedExpenses,
          totalAmount: updatedTotalAmount,
        })
      );
      console.log(updatedTotalAmount);
    },
    [dispatch, totalAmount, expenses]
  );

  const editItem = useCallback(
    async (item) => {
      console.log(item);
      amoutInputref.current.value = item.amount;
      desInputRef.current.value = item.description;
      setSelectedCategory(item.category);

      const updatedTotalAmount = totalAmount - Number(item.amount);
      const updatedExpenses = expenses.filter((exp) => {
        return exp.id !== item.id;
      });

      dispatch(
        expenseAction.removeExpense({
          expenses: updatedExpenses,
          totalAmount: updatedTotalAmount,
        })
      );
      console.log(updatedTotalAmount);
      //   setExpenses((prev) => {
      //     // find the index of the edited item in expense array
      //     const editIndex = prev.findIndex((editItem) => item.id === editItem.id);
      //     // if the item is found, update it with the edited data
      //     if (editIndex !== -1) {
      //       const updateExp = [...prev];
      //       updateExp[editIndex] = editItem;
      //       return updateExp;
      //     }
      //     return prev;
      //   });
    },
    [dispatch, totalAmount, expenses]
  );

  useEffect(() => {
    fetchExp();
  }, []);

  return (
    <>
      <h1 className="text-center mt-2">Daily Expenses</h1>
      <Button
        variant="primary"
        style={{ position: "relative", right: "-90%", top: "-50px" }}
        onClick={goHomeHandler}
      >
        Go To Home
      </Button>{" "}
      <div>
        {" "}
        <FloatingLabel
          controlId="floatingInput"
          label="Amount"
          className="mb-3 w-50 mx-auto"
        >
          <Form.Control
            type="number"
            placeholder="amount"
            className="lbl"
            ref={amoutInputref}
          />
        </FloatingLabel>{" "}
        <FloatingLabel
          controlId="floatingInput"
          label="Desctiption"
          className="mb-3 w-50 mx-auto"
        >
          <Form.Control
            type="text"
            placeholder="Des"
            style={{ height: "120px" }}
            className="lbl"
            ref={desInputRef}
          />
        </FloatingLabel>{" "}
        <div
          style={{ position: "relative", right: "-25%", minWidth: "300px" }}
          className="drp"
        >
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary"
            >
              {selectedCategory}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark" style={{ minWidth: "300px" }}>
              <Dropdown.Item
                href="#/action-1"
                active={selectedCategory === "Shopping"}
                onClick={() => handleCategorySelect("Shopping")}
              >
                Shopping
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-2"
                active={selectedCategory === "Food"}
                onClick={() => handleCategorySelect("Food")}
              >
                Food
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-3"
                active={selectedCategory === "Rent"}
                onClick={() => handleCategorySelect("Rent")}
              >
                Rent
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-3"
                active={selectedCategory === "Others"}
                onClick={() => handleCategorySelect("Others")}
              >
                Others
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div style={{ position: "relative", right: "-25%" }}>
          <Button
            variant="primary"
            size="lg"
            className="mb-3 w-50  mt-3"
            onClick={expHandler}
          >
            Add Expenses
          </Button>
        </div>
        <div style={{ position: "relative", right: "-25%" }}>
          <h3>Expenses:</h3>
        </div>
        {expenses.map((expense) => {
          return (
            <ExpenseItem
              key={expense.id}
              item={expense}
              onDeleteItem={deleteItem}
              onEditItem={editItem}
            />
          );
        })}
      </div>
      <div>
        <b>Total Amount </b> Rs {totalAmount}/-
      </div>
    </>
  );
};

export default Expenses;
