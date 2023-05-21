import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthForm from "./Component/Authentication/AuthForm";
import Home from "./Component/Home/Home";
import Profile from "./Component/Profile/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
