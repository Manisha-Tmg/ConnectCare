import React, { useEffect, useState, useRef } from "react";
import "../css/Header.css";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Function to get first initial of username
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "");

  useEffect(() => {
    if (Cookies.get("accessToken")) {
      setIsLoggedIn(true);
      const storedUsername = Cookies.get("username"); // geeting the username that is   stored in a cookie
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      Cookies.remove("accessToken", { path: "/" }); //to remove the cookies data that is saved
      Cookies.remove("username", { path: "/" });
      Cookies.remove("role", { path: "/" });
      Cookies.remove("user_id", { path: "/" });
      Cookies.remove("booking_id", { path: "/" });

      // Update state
      setIsLoggedIn(false);
      setUsername("");
      setIsDropdownOpen(false);
      navigate("/"); // Redirect to home
    }
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsDropdownOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

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
          {/* <li>
            <Link to="/profile" className="nav-link">
              Setting
            </Link>
          </li> */}
        </ul>
      </nav>

      <div className="profile-section">
        {isLoggedIn ? (
          <div className="avatar-container relative" ref={dropdownRef}>
            {/* Avatar Button */}
            <div className="avatar" onClick={toggleDropdown}>
              {getInitial(username)}
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <p className="dropdown-header">
                  Signed in as <br /> <strong>{username}</strong>
                </p>
                <Link to="/profile" className="nav-link">
                  Setting
                </Link>
                <p onClick={handleLogout} className="dropdown-item logout">
                  Log Out
                </p>
              </div>
            )}
          </div>
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
