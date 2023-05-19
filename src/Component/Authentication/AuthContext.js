import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  // default js trick...
  const userIsLoggedIn = !!token; //it's convert the value in true or false
  // if token(string) != null it return true
  // if token(string) = null it return false that's default js trick

  const logInHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("loginTime", Date.now());
  };

  const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("shoping-cart");
    localStorage.removeItem("loginTime");
  };

  // useEffect(() => {
  // this is not going to navigate so that this function will not solve
  //   const loginTime = localStorage.getItem("loginTime");
  //   // console.log("Login time: ", loginTime);
  //   const LOGOUT_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

  //   if (loginTime) {
  //     const timeElapsed = Date.now() - loginTime;
  //     console.log(Date.now(), ">>>>>", loginTime, ">>>>>", timeElapsed);
  //     // check if the token is expired
  //     if (timeElapsed > LOGOUT_TIME) {
  //       logOutHandler();
  //     } else {
  //       const timeOut = setTimeout(() => {
  //         logOutHandler();
  //       }, LOGOUT_TIME - timeElapsed); //set the timeout for the reamining time
  //       return () => clearTimeout(timeOut); //clear the timeout when the component unmounts
  //     }
  //   }
  // }, []);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: logInHandler,
    logout: logOutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
