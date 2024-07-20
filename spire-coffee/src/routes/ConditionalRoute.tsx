import React from "react";
import { useAuth } from "../context/AuthContext";
import Home from "@/pages/Home";
import Login from "@/pages/Login";

const ConditionalRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Home /> : <Login />;
};

export default ConditionalRoute;
