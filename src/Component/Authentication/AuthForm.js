import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useRef } from "react";
import { Alert, Button, Form, Spinner, FloatingLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const switchSignInToLogIn = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredconfirmPassword = confirmPasswordInputRef.current.value;
    console.log(
      "Submitting form with data: ",
      // enteredName,
      enteredEmail,
      enteredPassword,
      enteredconfirmPassword
    );
    if (enteredPassword !== enteredconfirmPassword) {
      setResponse("Password doesn't match. Please Re-entered password");
      setTimeout(() => {
        setResponse(null);
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        confirmPasswordInputRef.current.value = "";
      }, 5000);
      return;
    }
    setIsLoading(true);
    setIsAuthenticated(true);

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDNDfvfwu7PjWrSJOftKH9ssXItSzG7_yg";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDNDfvfwu7PjWrSJOftKH9ssXItSzG7_yg";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        // name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
        confirm: enteredconfirmPassword,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setIsLoading(false);
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        if (res.ok) {
          navigate("/Home");
          return res.json();
        } else {
          return res.json().then((data) => {
            // console.log(data);
            let errorMessg = "Authentication Failed";
            // if (data && data.error && data.error.message) {
            //   errorMessg = data.error.message;
            // }
            setResponse(errorMessg);
            throw new Error(errorMessg);
          });
        }
      })
      .then((data) => {
        // console.log(data);
        authCtx.login(data.idToken);
        localStorage.setItem("token", data.idToken);
        localStorage.setItem("emailId", data.email);
        if (!isLogin) {
          switchSignInToLogIn();
          setResponse(null);
        } else {
          navigate("/Home");
        }
      })
      .catch((err) => {
        setResponse(err.message);
        setTimeout(() => {
          setResponse(null);
        }, 5000);
      });
  };

  return (
    <>
      <div
        className="music-title-container"
        style={{ position: "absolute", top: "100px", right: "35%" }}
      >
        {" "}
        {isLogin ? (
          <span className="text-center fs-2">Login Generics Dashboard</span>
        ) : (
          <span className="text-center fs-2">Create Your Free Account </span>
        )}
      </div>
      {response && <Alert variant="danger">{response}</Alert>}
      <Form
        className="box"
        onSubmit={submitHandler}
        style={{ position: "relative", margin: "102px" }}
      >
        <FloatingLabel
          controlId="floatingInput"
          label="Email address (required)"
          className="mb-3 w-50 mx-auto"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            className="lbl"
            ref={emailInputRef}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Password (required)"
          className="w-50 mx-auto mb-3"
        >
          <Form.Control
            type="password"
            placeholder="password"
            className="lbl"
            ref={passwordInputRef}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingPassword"
          label="Confirm Password (required)"
          className="w-50 mx-auto"
        >
          <Form.Control
            type="password"
            placeholder="password"
            className="lbl"
            ref={confirmPasswordInputRef}
          />
        </FloatingLabel>

        <div className="d-flex justify-content-center">
          {!isLoading && !isAuthenticated && (
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="mt-3 w-50 mb-5 "
            >
              {isLogin ? "Login" : "Create Your Account"}
            </Button>
          )}
          {isLoading && (
            <div className="row align-items-center mt-4">
              <div className="col-auto">
                <h5>Loading</h5>
              </div>
              <div className="col-auto">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden"></span>
                </Spinner>
              </div>
            </div>
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <Link
            style={{
              fontSize: "medium",
              fontWeight: "bold",
            }}
            onClick={switchSignInToLogIn}
          >
            {isLogin
              ? "New Here? Sign up"
              : "If Already have an account? Login"}
          </Link>
        </div>
      </Form>
    </>
  );
};

export default AuthForm;
