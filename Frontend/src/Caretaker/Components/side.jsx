import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { API } from "../../env";
import "../Css/side.css";
import toast from "react-hot-toast";
import Logo from "./Logo";

const CaretakerSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("accessToken"));
  const [data, setData] = useState("");
  const id = Cookies.get("caretaker_id");

  useEffect(() => {
    async function fetchcaretakerdata() {
      const id = Cookies.get("caretaker_id");
      try {
        const res = await fetch(`${API}api/caretakers/${id}`);
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchcaretakerdata();
  }, []);

  const handleLogout = () => {
    toast((t) => (
      <span className="flex flex-col space-y-2">
        Are you sure you want to log out?
        <div className="flex gap-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);

              Cookies.remove("accessToken", { path: "/" }); // to remove the cookies data that is saved
              Cookies.remove("role", { path: "/" });
              Cookies.remove("caretaker_id", { path: "/" });

              setIsLoggedIn(false);
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

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      path: `/dashboard/${id}`,
      icon: <FaHome className="menu-icon" />,
      label: "Dashboard",
    },

    {
      path: "/booking/",
      icon: <FaCalendarAlt className="menu-icon" />,
      label: "Bookings Request",
    },
    {
      path: "/caretaker/profile",
      icon: <FaUser className="menu-icon" />,
      label: "Profile",
    },
    {
      path: `/caretaker/changepassword/${id}`,
      icon: <FaCog className="menu-icon" />,
      label: "Settings",
    },
  ];

  return (
    <div className="sidebar">
      <Logo />
      <div className="sidebar-header">
        <div className="header-content">
          <h2 className="user-name">{data.name}</h2>
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

export default CaretakerSidebar;
