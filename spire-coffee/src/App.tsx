import { Route, Routes } from "react-router-dom";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Body from "./component/Body";
import { AuthProvider } from "./context/AuthContext";
import ConditionalRoute from "./routes/ConditionalRoute";
import PublicRoute from "./routes/PublicRoute";
import SignUp from "./pages/Signup";

// as we decide on colors, font sizes and other design choices they can go here
const theme = createTheme();

function App() {
  return (
    <div className="App">
      <Body>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Routes>
              <Route element={<PublicRoute />}>
                <Route path="signUp" element={<SignUp />} />
              </Route>
              <Route path="/" element={<ConditionalRoute />} />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </Body>
    </div>
  );
}

export default App;
