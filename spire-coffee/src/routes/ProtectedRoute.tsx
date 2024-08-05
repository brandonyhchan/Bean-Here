import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../config/routes";
import NavBar from "../component/NavBar";
import "../index.scss";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>
    <NavBar />
    {element}
  </> : <Navigate to={ROUTES.LOGIN} />;
};

export default ProtectedRoute;
