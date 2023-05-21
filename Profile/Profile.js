import React, { useContext, useEffect, useRef, useState } from "react";
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
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDNDfvfwu7PjWrSJOftKH9ssXItSzG7_yg",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: localStorage.getItem("token"),
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          const user = data.users[0];
          console.log(user);
          console.log(user.photoUrl);
          console.log(user.displayName);

          nameInputRef.current.value = user.displayName;
          photoUrlInputRef.current.value = user.photoUrl;
        } else {
          console.log("Error:", res.status);
        }
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchProfile();
  }, []);

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

      if (res.ok) {
        alert("Updated Successfully");
        navigate("/home");
        nameInputRef.current.value = "";
        photoUrlInputRef.current.value = "";
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const cancelHandler = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="main-update-profile">
        <p className="mt-3">Winner never Quits , quitter never wins</p>
        <h1 className="text-center mt-2">Update Profile</h1>
        <div className="profile-update">
          Your Profile is 64% complete . A complete Profile has <br />
          higher chances of landing a job{" "}
        </div>
      </div>
      <h3 className="title">Contact Details</h3>
      <Button variant="outline-danger" className="cln" onClick={cancelHandler}>
        Cancel
      </Button>
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
