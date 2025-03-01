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
import toast from "react-hot-toast";

import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("accessToken"));
  const [data, setData] = useState(!!Cookies.get("accessToken"));

  const handleLogout = () => {
    toast((t) => (
      <span className="flex flex-col space-y-2">
        Are you sure you want to log out?
        <div className="flex gap-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);

              // Logout logic here
              Cookies.remove("accessToken", { path: "/" });
              Cookies.remove("role", { path: "/" });

              // to Update state
              setIsLoggedIn(false);
              navigate("/api/admin/login"); // Redirect to home

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
        <div className="admin-header-content">
          <h2 className="admin-user-name">{data.role ?? "Mishu"}</h2>
        </div>
      </div>

      <div className="admin-sidebar-content">
        <nav className="admin-sidebar-nav">
          <ul className="admin-menu-list">
            {menuItems.map((item, index) => (
              <li key={index} className="admin-menu-item">
                <Link
                  to={item.path}
                  className={`admin-menu-link ${
                    isActive(item.path) ? "active" : ""
                  }`}
                >
                  <span className="admin-icon-wrapper">{item.icon}</span>
                  <span className="admin-menu-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="sidebar-footer">
        <Link to={"/admin/login/"} style={{ textDecoration: "none" }}>
          <button onClick={handleLogout} className="logout-button">
            <FaSignOutAlt className="menu-icon" />
            <span className="logout-text">Log Out</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
