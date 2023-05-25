import React from "react";
import Table from "react-bootstrap/Table";
import "./ExpenseItem.css";
import { Button } from "react-bootstrap";

const ExpenseItem = (props) => {
  // let url = `https://expensetracker-d6e2d-default-rtdb.firebaseio.com/Expenses/${props.item.id}.json`;
  // const deleteHandler = async () => {
  //   try {
  //     const res = await fetch(url, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       alert("Expense Deleted SuccessFully");
  //       props.onDeleteItem(props.item);
  //     } else {
  //       throw data.error;
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // const editHandler = async () => {
  //   try {
  //     const res = await fetch(url, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(props.item),
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       props.onEditItem(props.item);
  //     } else {
  //       throw data.error;
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const deleteHandler = () => {
    props.onDeleteItem(props.item);
  };

  const editHandler = () => {
    props.onEditItem(props.item);
  };

  return (
    <div className="table-container">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr key={props.item.id}>
            <td>{props.item.amount}</td>
            <td> {props.item.description}</td>
            <td>{props.item.category}</td>
            <td>
              {" "}
              <Button variant="danger" onClick={deleteHandler}>
                Delete
              </Button>{" "}
              <Button variant="success" onClick={editHandler}>
                Edit
              </Button>{" "}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ExpenseItem;
