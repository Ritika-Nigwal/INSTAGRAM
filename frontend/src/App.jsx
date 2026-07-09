import Login from "./Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Reels from "./Reels.jsx";
import Layout from "./Layout.jsx";
import Register from "./Register.jsx";
import OtherProfile from "./OtherProfile.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
