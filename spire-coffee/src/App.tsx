import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import mainTheme from './styles/mainTheme';
import Body from "./component/Body";
import { AuthProvider } from "./context/AuthContext";
import { ROUTES } from "./config/routes";
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
              <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
              <Route path={ROUTES.LOGIN} element={<Login />} />

              {/* Default redirection based on authentication status */}
              <Route
                path={ROUTES.ROOT}
                element={<ProtectedRoute element={<Navigate to={ROUTES.HOME} />} />}
              />

              {/* Protected routes */}
              <Route
                path={ROUTES.HOME}
                element={<ProtectedRoute element={<Home />} />}
              />
               <Route
                path={ROUTES.EXPLORE}
                element={<ProtectedRoute element={<Explore />} />}
              />
              <Route
                path={ROUTES.FAVOURITES}
                element={<ProtectedRoute element={<Favourites />} />}
              />
               <Route
                path={ROUTES.ADD_CAFE}
                element={<ProtectedRoute element={<AddCafe />} />}
              />
               <Route
                path={ROUTES.ACCOUNT}
                element={<ProtectedRoute element={<Account />} />}
              />

              {/* Redirect unknown paths to the login page */}
              <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </Body>
    </div>
  );
}

export default App;
