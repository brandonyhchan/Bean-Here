import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import mainTheme from './styles/mainTheme';
import Body from "./component/Body";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Favourites from "./pages/Favourites";
import AddCafe from "./pages/AddCafe";
import Account from "./pages/Account";

function App() {
  return (
    <div className="App">
      <Body>
        <ThemeProvider theme={mainTheme}>
          <AuthProvider>
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />

              {/* Default redirection based on authentication status */}
              <Route
                path="/"
                element={<ProtectedRoute element={<Navigate to="/home" />} />}
              />

              {/* Protected routes */}
              <Route
                path="/home"
                element={<ProtectedRoute element={<Home />} />}
              />
               <Route
                path="/explore"
                element={<ProtectedRoute element={<Explore />} />}
              />
              <Route
                path="/favourites"
                element={<ProtectedRoute element={<Favourites />} />}
              />
               <Route
                path="/addCafe"
                element={<ProtectedRoute element={<AddCafe />} />}
              />
               <Route
                path="/account"
                element={<ProtectedRoute element={<Account />} />}
              />

              {/* Redirect unknown paths to the login page */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </Body>
    </div>
  );
}

export default App;
