import React from "react";
import {
  FaTasks,
  FaCalendarAlt,
  FaUser,
  FaBell,
  FaStar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "../css/side.css";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

const CaretakerSidebar = () => {
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Remove accessToken cookie
      document.cookie =
        "accessToken=; path=/; expires=Thu, 01 Jan 2970 00:00:00 UTC;";
      document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie =
        "caretaker_id=; path=/; expires=Thu, 01 Jan 2970 00:00:00 UTC;";

      // Update state
      setIsLoggedIn(false);
      navigate("/"); // Redirect to home
    }
  };

  return (
    <div className="caretaker-sidebar">
      <Logo />
      <ul className="sidebar-menu">
        <Link to={"/dashboard"}>
          <li>
            <FaTasks className="icon" />
            <span className="sidebar-menu2">Dashboard</span>
          </li>
        </Link>
        <Link to={"/task"}>
          <li>
            <FaTasks className="icon" />
            <span className="sidebar-menu2">Tasks</span>
          </li>
        </Link>
        {/* <li>
          <FaCalendarAlt className="icon" />
          <span className="sidebar-menu2">Calendar</span>
        </li> */}
        {/* <li>
          <FaUser className="icon" />
          <span className="sidebar-menu2"> Profile Management</span>
        </li> */}
        <Link to={"/booking"}>
          <li>
            <FaUser className="icon" />
            <span className="sidebar-menu2">Booking</span>
          </li>
        </Link>
        <Link to={"/notification"}>
          <li>
            <FaBell className="icon" />
            <span className="sidebar-menu2">Notifications</span>
          </li>
        </Link>
        {/* <li>
          <FaStar className="icon" />
          <span className="sidebar-menu2">Reviews</span>
        </li> */}
        <Link to={"/caretaker/profile"}>
          <li>
            <FaCog className="icon" />
            <span className="sidebar-menu2">Settings</span>
          </li>
        </Link>
        <li>
          <FaSignOutAlt className="icon" />
          <span className="sidebar-menu2" onClick={handleLogout}>
            Logout
          </span>
        </li>
      </ul>
    </div>
  );
};

export default CaretakerSidebar;
