import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import Body from "./component/Body";
import { ROUTES } from "./config/routes";
import { AuthProvider } from "./context/AuthContext";
import { StateProvider } from "./context/StateContext";
import AddCafe from "./pages/cafe/AddCafe";
import CafeInfo from "./pages/cafe/CafeInfo";
import Explore from "./pages/cafe/Explore";
import Favourites from "./pages/cafe/Favourites";
import AboutUs from "./pages/info/AboutUs";
import FAQ from "./pages/info/FAQ";
import Help from "./pages/info/Help";
import Account from "./pages/user/Account";
import Login from "./pages/user/Login";
import SignUp from "./pages/user/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";
import mainTheme from "./styles/mainTheme";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <AuthProvider>
        <StateProvider>
          <Body>
            <Routes>
              <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
              <Route path={ROUTES.FAQ} element={<FAQ />} />
              <Route path={ROUTES.HELP} element={<Help />} />

              {/* Default redirection based on authentication status */}
              <Route
                path={ROUTES.ROOT}
                element={
                  <ProtectedRoute
                    element={<Navigate to={ROUTES.EXPLORE} />}
                  />
                }
              />

              {/* Protected routes */}
              <Route
                path={ROUTES.EXPLORE}
                element={<ProtectedRoute element={<Explore />} />}
              />
              <Route
                path={'/cafes/:cafeId'}
                element={<ProtectedRoute element={<CafeInfo />} />}
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
          </Body>
        </StateProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
