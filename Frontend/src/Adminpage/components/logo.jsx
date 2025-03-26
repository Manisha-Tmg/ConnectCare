import React from "react";
import "../Css/logo.css";
import logo from "../assets/Group 28.png";

const Logo = () => {
  return (
    <div className="main">
      <div className="left-container">
        <img className="imge" src={logo}></img>
      </div>
    </div>
  );
};

export default Logo;
