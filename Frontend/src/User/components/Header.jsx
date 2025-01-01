import React, { useEffect, useState, useRef } from "react";
import "../css/Header.css";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { API } from "../../env";
import Li from "./navli";
import toast from "react-hot-toast";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
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
        // Optionally fetch notifications here too
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }

    const token = Cookies.get("accessToken");
    const id = Cookies.get("user_id");
    if (token && id) {
      setIsLoggedIn(true);
      fetchProfile();
    } else {
      setIsLoggedIn(false);
    }
    // fetchProfile();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.classList.contains("hamburger-icon") &&
        !event.target.closest(".hamburger-icon")
      ) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    toast((t) => (
      <span className="flex flex-col space-y-2">
        Are you sure you want to log out?
        <div className="flex gap-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);

              // Logout \
              Cookies.remove("accessToken", { path: "/" }); // to remove the cookies data that is saved
              Cookies.remove("role", { path: "/" });
              Cookies.remove("user_id", { path: "/" });
              Cookies.remove("booking_id", { path: "/" });

              setIsLoggedIn(false);
              setIsDropdownOpen(false);
              setIsMobileMenuOpen(false);
              navigate("/"); // Redirect to home

              toast.success("You have been logged out.");
            }}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            No
          </button>
        </div>
      </span>
    ));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Logo />
      </div>

      {/* Hamburger Menu Icon */}
      <div className="hamburger-icon" onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Desktop Navigation */}
      <div className="desktop-nav">
        <Li />
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-menu" ref={mobileMenuRef}>
          <nav className="caretaker-nav">
            <ul>
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/find-caretaker" className="nav-link">
                  Find Caretaker
                </Link>
              </li>
              <li>
                <Link to="/about" className="nav-link">
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
          {isLoggedIn ? (
            <div className="mobile-profile-section">
              <div className="mobile-dropdown-links">
                <Link to="/profile" className="mobile-dropdown-item">
                  My Profile
                </Link>
                <Link to="/change-password" className="mobile-dropdown-item">
                  Change Password
                </Link>
                <Link
                  to={`/booking-details/${data.id}`}
                  className="mobile-dropdown-item"
                >
                  Booking Details
                </Link>
                <p onClick={handleLogout} className="mobile-dropdown-item">
                  Log Out
                </p>
              </div>
            </div>
          ) : (
            <div className="mobile-login-btn-container">
              <Link to="/login" className="mobile-login-link">
                <button className="btn-login mobile-login-btn">Log In</button>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Desktop Profile Section */}
      <div className="nav-profile-section">
        {isLoggedIn ? (
          <div className="nav-avatar-container relative" ref={dropdownRef}>
            <div className="nav-avatar-wrapperr">
              <div className="nav-avatarr" onClick={toggleDropdown}>
                <img
                  src={data?.profile_picture_url}
                  alt="Img"
                  className="nav-imgg"
                />
              </div>
            </div>

            {/* Profile Dropdown */}
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <p className="dropdown-header">
                  Signed in as <br /> <strong>{data?.username}</strong>
                </p>
                <Link to="/profile" className="dropdown-item logout">
                  My Profile
                </Link>
                <Link to="/change-password" className="dropdown-item logout">
                  Change Password
                </Link>
                <Link
                  to={`/booking-details/${data.id}`}
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
