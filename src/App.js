// import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="aldiapais/login" element={<Login />}></Route>
      <Route
        path="/aldiapais"
        element={
          <ProtectedRoute>
            {" "}
            <Admin />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

export default App;
