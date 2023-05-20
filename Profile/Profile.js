import React, { useContext, useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./Profile.css";
import { Button } from "react-bootstrap";
import AuthContext from "../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const nameInputRef = useRef();
  const photoUrlInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(authCtx.token);
  const updateProfile = async (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredPhotoUrl = photoUrlInputRef.current.value;
    console.log(enteredName, enteredPhotoUrl);
    console.log(localStorage.getItem("token"));

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDNDfvfwu7PjWrSJOftKH9ssXItSzG7_yg",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            displayName: enteredName,
            photoUrl: enteredPhotoUrl,
            idToken: localStorage.getItem("token"),
            returnSecureToken: false,
          }),
        }
      );
      console.log("Response status code:", res.status);

      const data = await res.json();
      console.log("Response data:", data);

      nameInputRef.current.value = "";
      photoUrlInputRef.current.value = "";

      if (res.ok) {
        alert("Updated Successfully");
        navigate("/home");
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h3 className="title">Contact Details</h3>
      <Row className="g-2">
        <Col md>
          <FloatingLabel
            controlId="floatingInputGrid"
            label="Full Name"
            className="mb-3 w-50 mx-auto mt-5"
          >
            <Form.Control type="text" placeholder="name" ref={nameInputRef} />
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel
            controlId="floatingSelectGrid"
            label="Profile Photo URL"
            className="mb-3 w-50 mx-auto mt-5"
          >
            <Form.Control
              type="text"
              placeholder="url"
              ref={photoUrlInputRef}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="update"
        onClick={updateProfile}
      >
        Update
      </Button>
    </>
  );
}

export default Profile;
