import React from "react";
import "./App.css";

import logo from './assets/logo-ellus.png'
import Routes from "./routes";

function App() {
  return (
    <div>
      <div className="principal">
        <img src={logo} alt="logo" height="60px" />
      </div>
      <div className="header">

      </div>
      <Routes />
    </div>
  );
}

export default App;
