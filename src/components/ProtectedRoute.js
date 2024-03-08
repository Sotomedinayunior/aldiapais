import { Navigate } from "react-router-dom";

export default function ProtectedRouter({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/aldiapais/login" />;
  }
  return children;
}
