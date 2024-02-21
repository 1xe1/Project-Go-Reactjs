import React from "react";
import logo from "../images/logo.png"; // Import รูปภาพโลโก้
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <div>
      <nav className="bg-gradient-to-r from-purple-600 to-blue-400 border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src={logo} // ใช้ตัวแปร logo ที่ import เข้ามาเป็น src
              className="h-20"
              alt="My logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white glow-dark">
              School
            </span>
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a
              href="Name"
              className="text-sm text-white dark:text-gray-200 hover:underline"
            >
              UserName
            </a>
            <a
              href="#"
              className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
            >
              Login
            </a>
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
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
