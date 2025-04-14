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
      icon: <FaHome className="icon" />,
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
      icon: <FaCog className="icon" />,
      label: "Bookings",
    },
  ];

  return (
    <div className="admin-sidebar">
      <div className="sidebar-logo">
        <Logos />
      </div>

      <h2 className="admin-title">Admin</h2>

      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <Link to={item.path} key={item.path} className="sidebar-link">
            <li className={isActive(item.path) ? "active-menu-item" : ""}>
              {item.icon}
              <span className="sidebar-menu2">{item.label}</span>
            </li>
          </Link>
        ))}

        <li className="logout-item" onClick={handleLogout}>
          <FaSignOutAlt className="icon" />
          <span className="sidebar-menu2">Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
