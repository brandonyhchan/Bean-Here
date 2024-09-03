import { useGlobalStateManager } from "@/context/StateContext";
import React from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../config/routes";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated } = useGlobalStateManager();
  return isAuthenticated ? (
    <>
      {element}
    </>
  ) : (
    <Navigate to={ROUTES.LOGIN} />
  );
};

export default ProtectedRoute;
