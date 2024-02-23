import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "./Heartbeat.css";

const Navbar = () => {
  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const userEmail = localStorage.getItem("email");

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    console.log("Logout successful");
    // Update login status
    setIsLoggedIn(false);
    // Redirect to login page after logout
    window.location.href = "/login";
  };

  useEffect(() => {
    // Check login status on component mount
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  return (
    <>
      <div>
        <nav className="bg-gradient-to-r from-purple-600 to-blue-400 border-gray-200 dark:bg-gray-900">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-20" alt="My logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white glow-dark">
                School
              </span>
            </Link>
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <div className="flex items-center">
                <div className="heart">
                  <div className="heartbeat">❤️</div>
                  <div className="heartecho">❤️</div>
                </div>
                <a
                  href="/"
                  className=" text-base text-whitedark:text-gray-200 hover:underline"
                >
                  {userEmail}
                </a>
              </div>
              {isLoggedIn ? (
                
                <a
                  href="#"
                  className=" text-xl text-red-600 dark:text-red-500 hover:underline"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              ) : (
                <Link
                  to="/login"
                  className="text-sm text-red-600 dark:text-red-500 hover:underline"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
        <nav className="bg-opacity-50 bg-gray-50 dark:bg-gray-700">
          <div className="max-w-screen-xl px-4 py-3 mx-auto">
            <div className="flex items-center">
              <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li>
                  <Link
                    to="/"
                    className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition duration-300"
                  >
                    Home
                  </Link>
                </li>
                {isLoggedIn && (
                  <>
                    <li>
                      <Link
                        to="/User"
                        className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition duration-300"
                      >
                        User
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/student"
                        className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition duration-300"
                      >
                        Student
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/subject"
                        className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition duration-300"
                      >
                        Subject
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/teacher"
                        className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition duration-300"
                      >
                        Teacher
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
