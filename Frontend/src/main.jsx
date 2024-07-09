import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
export const server = "http://localhost:3001"


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
