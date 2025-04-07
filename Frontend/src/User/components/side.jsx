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
import "../css/side.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Logos from "../Pages/Caretaker/Components/Logo";
import { API } from "../../env";
import { useEffect } from "react";

const CaretakerSidebar = () => {
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
      Cookies.remove("caretaker_id", { path: "/" });

      // Update state
      setIsLoggedIn(false);
      navigate("/login/caretaker");
    }
  };

  useEffect(() => {
    async function fetchcaretakerdata() {
      const id = Cookies.get("caretaker_id");
      const name = Cookies.get("name");
      try {
        const res = await fetch(`${API}api/caretakers/${id}`);
        const data = await res.json();
        setData(data);
      } catch (error) {}
    }
    fetchcaretakerdata();
  }, []);

  // Check if current path matches the link path
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Menu items configuration
  const menuItems = [
    {
      path: "/dashboard",
      icon: <FaHome className="icon" />,
      label: "Dashboard",
    },
    // {
    //   path: "/calendar",
    //   icon: <FaCalendarAlt className="icon" />,
    //   label: "Calendar",
    // },
    {
      path: "/booking/",
      icon: <FaBookmark className="icon" />,
      label: "Booking",
    },
    {
      path: "/notification",
      icon: <FaBell className="icon" />,
      label: "Notifications",
    },
    {
      path: "/caretaker/profile",
      icon: <FaCog className="icon" />,
      label: "Settings",
    },
  ];

  return (
    <div className="caretaker-sidebar">
      <div className="sidebar-logo">
        <Logos />
      </div>

      <h2 className="sidebar-title">{data.name}</h2>

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

export default CaretakerSidebar;
