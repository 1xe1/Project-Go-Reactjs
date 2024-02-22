import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Modal from "react-modal";
import { createRoot } from "react-dom/client";

// Set the app element
Modal.setAppElement("#root");

// Render the React application with concurrent mode
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="true"
    />{" "}
    {/* Use crossOrigin instead of crossorigin */}
    <link
      href="https://fonts.googleapis.com/css2?family=Sriracha&display=swap"
      rel="stylesheet"
    />

    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
