import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();
  const verifyEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDNDfvfwu7PjWrSJOftKH9ssXItSzG7_yg",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: localStorage.getItem("token"),
          }),
        }
      );
      if (res.ok) {
        alert("Verification mail is sent, please check your mail");
      }
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
    alert("Logout SuccessFully");
  };
  return (
    <>
      <div className=" mt-2 mb-2">
        <h1
          style={{
            position: "absolute",
            right: "35%",
            // borderBottom: "3px solid black",
          }}
        >
          Welcome to Expense Tracker
        </h1>
        <p style={{ position: "relative", marginLeft: "76%", top: "15px" }}>
          Your profile is incomplete. <Link to="/profile">Complete Now</Link>
        </p>
      </div>
      <div className="mt-5" style={{ borderBottom: "3px solid black" }}></div>
      <div style={{ position: "relative", top: "-65px", right: "-45px" }}>
        <Button variant="outline-danger" onClick={logoutHandler}>
          LogOut
        </Button>{" "}
      </div>
      <div style={{ position: "relative", top: "22px", right: "-42px" }}>
        <Button variant="outline-success" onClick={verifyEmail}>
          Verify Email
        </Button>{" "}
      </div>
    </>
  );
};

export default Home;
