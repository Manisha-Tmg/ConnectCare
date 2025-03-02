import React, { useEffect, useState } from "react";
import "../css/Header.css";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if authentication cookie exists
    const cookies = document.cookie.split("; ");
    const authCookie = cookies.find((cookie) =>
      cookie.startsWith("accessToken=")
    );

    if (authCookie) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    navigate("/");
  };

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
              About Us
            </Link>
          </li>
          <li>
            <Link to="/blog" className="nav-link">
              Blog
            </Link>
          </li>
        </ul>
      </nav>

      <div className="profile-section">
        {isLoggedIn ? (
          <button className="btn-login" onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <Link to="/login">
            <button className="btn-login">Log In</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
