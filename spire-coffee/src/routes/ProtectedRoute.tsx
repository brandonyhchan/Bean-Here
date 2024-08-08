import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../config/routes";
import Navbar from "../component/Navbar";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <>
      <Navbar />
      {element}
    </>
  ) : (
    <Navigate to={ROUTES.LOGIN} />
  );
};

export default ProtectedRoute;
