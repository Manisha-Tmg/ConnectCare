import React, { useEffect, useState } from "react";
import "../css/Header.css";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Function to get a cookie by name
  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
  };

  useEffect(() => {
    if (getCookie("accessToken")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Remove accessToken cookie
      document.cookie =
        "accessToken=; path=/; expires=Thu, 01 Jan 2970 00:00:00 UTC;";
      document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie =
        "user_id=; path=/; expires=Thu, 01 Jan 2970 00:00:00 UTC;";

      // Update state
      setIsLoggedIn(false);
      navigate("/"); // Redirect to home
    }
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
            <Link to="/bookcaretaker" className="nav-link">
              Find Caretaker
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
