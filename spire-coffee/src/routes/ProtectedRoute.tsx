import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CssBaseline } from "@mui/material";
import NavBar from "@/component/NavBar";
import Footer from "@/component/footer/Footer";
import { ROUTES } from "../config/routes";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>
    <CssBaseline />
    <NavBar />
    {element}
    <Footer />
  </> : <Navigate to={ROUTES.LOGIN}  />;
};

export default ProtectedRoute;
