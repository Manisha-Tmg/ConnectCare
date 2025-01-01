import React from "react";
import "../css/logo.css";
// import logo from "../../assets/Tm.png";
import logo from "../../assets/CAre.png";

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
