import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar"; // Import the Navbar component
import Footer from "./Components/Footer"; // Import the Footer component
import Login from "./Components/Login";
import User from "./Components/User";
import Student from "./Components/Student";
import Subject from "./Components/Subject";
import Teacher from "./Components/Teacher";
import HomePage from "./Components/HomePage";

function App() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Handle login logic here...
    // After successful login, navigate to home page and reload
    navigate('/', { replace: true });
    window.location.reload();
  };

  return (
    <>
      <Navbar /> {/* Render the Navbar component */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/User" element={<User />} />
        <Route path="/student" element={<Student />} />
        <Route path="/subject" element={<Subject />} />
        <Route path="/teacher" element={<Teacher />} />
      </Routes>
      <Footer /> {/* Render the Footer component */}
    </>
  );
}

export default App;
