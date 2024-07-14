import { Route, Routes } from "react-router-dom";
import "./App.css";
import Body from "./component/Body";
import SignIn from "./pages/signin";

function App() {
  return (
    <div className="App">
      <Body>
        <Routes>
          <Route path="/" element={<SignIn />} />
        </Routes>
      </Body>
    </div>
  );
}

export default App;
