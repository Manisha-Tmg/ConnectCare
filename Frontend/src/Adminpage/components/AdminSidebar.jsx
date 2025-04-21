import "../Css/Admin.css";
import React, { useState } from "react";
import {
  FaTasks,
  FaCalendarAlt,
  FaUser,
  FaBell,
  FaStar,
  FaCog,
  FaSignOutAlt,
  FaHome,
  FaBookmark,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Logos from "../../Caretaker/Components/Logo";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("accessToken"));
  const [data, setData] = useState(!!Cookies.get("accessToken"));

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Remove cookies
      Cookies.remove("accessToken", { path: "/" });
      Cookies.remove("role", { path: "/" });

      // Update state
      setIsLoggedIn(false);
      navigate("/api/admin/login");
    }
  };

  // Check if current path matches the link path
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Menu items configuration
  const menuItems = [
    {
      path: "/admin/Dashboard",
      icon: <FaHome className="menu-icon" />,
      label: "Dashboard",
    },

    {
      path: "/admin/Caretaker",
      icon: <FaBookmark className="icon" />,
      label: "Caretakers",
    },

    {
      path: "/admin/Users",
      icon: <FaBell className="icon" />,
      label: "Users",
    },
    {
      path: "/admin/bookings",
      icon: <FaCalendarAlt className="menu-icon" />,
      label: "Bookings",
    },
  ];

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-header">
        <div className="header-content">
          <h2 className="user-name">{data.role}</h2>
        </div>
      </div>

      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <ul className="menu-list">
            {menuItems.map((item, index) => (
              <li key={index} className="menu-item">
                <Link
                  to={item.path}
                  className={`menu-link ${isActive(item.path) ? "active" : ""}`}
                >
                  <span className="icon-wrapper">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt className="menu-icon" />
          <span className="logout-text">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
