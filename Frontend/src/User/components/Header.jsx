import React, { useEffect, useState, useRef } from "react";
import "../css/Header.css";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { API } from "../../env";import { IoNotificationsOutline } from "react-icons/io5";


const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [data, setData] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      const token = Cookies.get("accessToken");
      const id = Cookies.get("user_id");

      if (!token || !id) {
        console.error("Missing authentication details");
        return;
      }

      try {
        const res = await fetch(`${API}api/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }

    if (Cookies.get("accessToken")) {
      setIsLoggedIn(true);
    
    }
    fetchProfile();
  }, []);


  // useEffect(() => {

  // }, []);

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

  return (
    <header className="header">
      <div>
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
            <Link to="/caretaker" className="nav-link">
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
<
      <div className="nav-profile-section">
        {isLoggedIn ? (
          <div className="nav-avatar-container relative" ref={dropdownRef}>
            <div className="nav-avatar" onClick={toggleDropdown}>
              <img
                src={data.profile_picture_url}
                alt="Img"
                className="nav-img"
              />
            </div>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <p className="dropdown-header">
                  Signed in as <br /> <strong>{data.username}</strong>
                </p>
                <Link to="/profile" className="dropdown-item logout">
                  My Profile
                </Link>

                <Link to="/change-password" className="dropdown-item logout">
                  Change Password
                </Link>

                <Link
                  to="/booking-details/:booking_id"
                  className="dropdown-item logout"
                >
                  Booking Details
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
