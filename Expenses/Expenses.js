import React, { useRef, useState } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import "./Expenses.css";
import { useNavigate } from "react-router-dom";

const Expenses = () => {
  const amoutInputref = useRef();
  const desInputRef = useRef();
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  const expHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amoutInputref.current.value;
    const enteredDes = desInputRef.current.value;

    console.log(enteredAmount, enteredDes, selectedCategory);

    const newExpenses = {
      amount: enteredAmount,
      description: enteredDes,
      category: selectedCategory,
    };

    setExpenses((prev) => [...prev, newExpenses]);
  };

  const goHomeHandler = () => {
    navigate("/home");
  };

  return (
    <>
      <h1 className="text-center mt-5">Daily Expenses</h1>
      <Button
        variant="primary"
        style={{ position: "relative", right: "-25%", top: "16px" }}
        onClick={goHomeHandler}
      >
        Go To Home
      </Button>{" "}
      <div className="mt-5">
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
          {expenses.map((expense, index) => (
            <div key={index}>
              <strong>Amount: </strong> {expense.amount} -
              <strong>Description: </strong>
              {expense.description} -<strong>Category:</strong>
              {expense.category}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Expenses;
