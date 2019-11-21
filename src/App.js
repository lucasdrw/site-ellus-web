import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

import logo from "./assets/logo-ellus.png"
import Routes from "./routes";

function App() {
  return (
    <div>
      <div className="principal">
        <div className="logo">
        <img src={logo} alt="logo" height="60px" />
        </div>
      </div>
      <Routes />
    </div>
  );
}

export default App;
