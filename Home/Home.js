import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="border-bottom">
      <h1 style={{ display: "inline-block" }}>Welcome to Expense Tracker</h1>
      <p style={{ display: "inline-block", marginLeft: "39%" }}>
        Your profile is incomplete. <Link to="/profile">Complete Now</Link>
      </p>
    </div>
  );
};

export default Home;
