import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Body from "./component/Body";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";

// as we decide on colors, font sizes and other design choices they can go here
const theme = createTheme();

function App() {
  return (
    <div className="App">
      <Body>
        <ThemeProvider theme={theme}>
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
              {/* <Route
                path="/favourites"
                element={<ProtectedRoute element={<Favourites />} />}
              /> */}

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
