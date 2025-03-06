import React from "react";
import "../css/logo.css";
import logo from "../../assets/Tm.png";

const Logo = () => {
  return (
    <div className="main">
      <div className="left-container">
        <img className="imge" src={logo}></img>
        <div className="logos">
          {/* <div className="logo1">Connect</div>
          <div className="logo">Care</div> */}
        </div>
      </div>
    </div>
  );
};

export default Logo;
