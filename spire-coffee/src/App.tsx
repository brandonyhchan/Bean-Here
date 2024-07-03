import { Route, Routes } from "react-router-dom";
import "./App.css";
import Body from "./component/Body";
import Login from "./pages/login";

function App() {
  return (
    <div className="App">
      <Body>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Body>
    </div>
  );
}

export default App;
