import { Route, Routes } from "react-router-dom";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Body from "./component/Body";
import Login from "./pages/Login";
import Home from "./pages/Home";

// as we decide on colors, font sizes and other design choices they can go here
const theme = createTheme();

function App() {
  return (
    <div className="App">
      <Body>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </ThemeProvider>
      </Body>
    </div>
  );
}

export default App;
