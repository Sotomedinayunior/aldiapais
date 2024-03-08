import { Route, Navigate } from "react-router-dom";

const LogoutRoute = () => {
  localStorage.clear();
  return <Navigate to="/aldiapais" />;
};

export default LogoutRoute;
