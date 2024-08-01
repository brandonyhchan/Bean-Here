import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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

// as we decide on colors, font sizes and other design choices they can go here
const theme = createTheme({
  palette: {
    primary: { // tan colours
      main: "#a1887f",
      light: "#a1887fa4",
      dark: "#8b7972"
    },
    secondary: { // blue colours
      main: "#3f51b5",
      light: "#bec8ff",
      dark: "#344397"
    },
    warning: {
      main: "rgb(255, 32, 32)",
    },
  },
  typography: {
    fontFamily: "Figtree-Regular",
    fontSize: 14,
    h1: {
      fontSize: "3.2rem",
      lineHeight: "1.1",
    },
    h2: {
      fontSize: "3.75rem",
    },
    h3: {
      fontSize: "2.3rem",
    },
    h4: {
      fontSize: "2.125rem",
    },
    h5: {
      fontSize: "20px", // This is the "large font" from old spire coffee
    },
    h6: {
      fontSize: "18px", // This is the "medium font" from old spire coffee
    },
    button: {
      fontSize: "1em",
      fontWeight: 500,
      fontFamily: "Figtree-Regular",
    },
  },
});

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
