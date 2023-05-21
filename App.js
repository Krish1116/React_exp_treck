import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Component/Home/Home";
import Profile from "./Component/Profile/Profile";
import AuthForm from "./Component/Authentication/AuthForm";
import ForgotPassword from "./Component/ForgotPassword/ForgotPassword";
import Expenses from "./Component/Expenses/Expenses";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
