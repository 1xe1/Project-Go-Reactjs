import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./Components/Navbar"; // Import the Navbar component
import Footer from "./Components/Footer"; // Import the Footer component
import Login from "./Components/Login";
import User from "./Components/User";

function App() {
  return (
    <>
      <Navbar /> {/* Render the Navbar component */}
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/User" element={<User />} />
      </Routes>
      <Footer /> {/* Render the Footer component */}
    </>
  );
}

export default App;
