import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Component/Home/Home";
import Profile from "./Component/Profile/Profile";
import AuthForm from "./Component/Authentication/AuthForm";
import ForgotPassword from "./Component/ForgotPassword/ForgotPassword";
import Expenses from "./Component/Expenses/Expenses";
import { useSelector } from "react-redux";
import Premium from "./Component/Primium/Primium";
function App() {
  const themeMode = useSelector((state) => state.theme.theme);

  return (
    <div className={themeMode === "dark" ? "dark-mode" : ""}>
      <Premium />
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
