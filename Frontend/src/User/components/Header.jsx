import React, { useEffect, useState, useRef } from "react";
import "../css/Header.css";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { API } from "../../env";
import { IoNotificationsOutline } from "react-icons/io5";
import Li from "./navli";
import ProfileDropdown from "./ProfileDropd";
import NotificationDropdown from "./NotificationDropd";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setisNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const [notifications, setNotifications] = useState([
    { message: "Your booking has been confirmed!" },
    { message: "New caretaker matched your request." },
  ]);

  const [data, setData] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile(e) {
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
      Cookies.remove("role", { path: "/" });
      Cookies.remove("user_id", { path: "/" });
      Cookies.remove("booking_id", { path: "/" });

      // Update state
      setIsLoggedIn(false);
      setIsDropdownOpen(false);
      setNotifications(false);
      navigate("/"); // Redirect to home
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setisNotificationOpen(false);
  };

  const toggleNotificationDropdown = () => {
    setisNotificationOpen(!isNotificationOpen);
    setIsDropdownOpen(false);
  };

  return (
    <header className="header">
      <div>
        <Logo />
      </div>
      <Li />
      <div className="nav-profile-section">
        {isLoggedIn ? (
          <div className="nav-avatar-container relative" ref={dropdownRef}>
            <div className="nav-avatar-wrapper">
              <IoNotificationsOutline
                className="iconnnnn"
                onClick={toggleNotificationDropdown}
              />
              <div
                className="nav-avatar"
                onClick={toggleDropdown}
                ref={notificationRef}
              >
                <img
                  src={data.profile_picture_url}
                  alt="Img"
                  className="nav-img"
                />
              </div>
            </div>
            {/* Dropdown Menu */}
            {isNotificationOpen && (
              <NotificationDropdown notifications={notifications} />
            )}
            {isDropdownOpen && <ProfileDropdown />}
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
