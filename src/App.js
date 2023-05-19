import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthForm from "./Component/Authentication/AuthForm";
import Home from "./Component/Home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
