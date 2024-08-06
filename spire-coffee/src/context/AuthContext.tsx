import { ROUTES } from "@/config/routes";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  setAuthStatus: (status: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("authToken")
  );
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status when the component mounts
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const login = (token: string) => {
    localStorage.removeItem("authToken");
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    // Redirect to the homepage or the originally intended route
    navigate(ROUTES.EXPLORE);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    // Redirect to the login page or another public route
    navigate("/login");
  };

  const setAuthStatus = (status: boolean) => {
    setIsAuthenticated(status);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, setAuthStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
