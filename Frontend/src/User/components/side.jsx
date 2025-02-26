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
        <li>
          <FaCog className="icon" />
          <span className="sidebar-menu2">Settings</span>
        </li>
        <Link to={"/login"}>
          <li>
            <FaSignOutAlt className="icon" />
            <span className="sidebar-menu2">Logout</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default CaretakerSidebar;
