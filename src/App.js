// import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import View from "./pages/View";

import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />}></Route>
      <Route
        path="/aldiapais"
        element={
          <ProtectedRoute>
            {" "}
            <Admin />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="Vista"
        element={
          <ProtectedRoute>
            {" "}
            <View />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
