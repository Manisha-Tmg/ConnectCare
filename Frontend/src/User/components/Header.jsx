import React, { useEffect, useState } from "react";
import "../css/Header.css";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Header = () => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setLogin(true);
    }
  });

  return (
    <header className="header">
      <div className="logo">
        <Logo />
      </div>
      <nav className="caretaker-nav">
        <ul>
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/aboutus" className="nav-link">
              AboutUs
            </Link>
          </li>
          <li>
            <Link to="/blog" className="nav-link">
              Blog
            </Link>
          </li>
          <li></li>
        </ul>
      </nav>

      <div className="profile-section">
        {/* <Link to="/profile">
          <button className="btn-profile">My Profile</button>
        </Link> */}
        <Link to="/login">
          <button className="btn-login">Log In</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
