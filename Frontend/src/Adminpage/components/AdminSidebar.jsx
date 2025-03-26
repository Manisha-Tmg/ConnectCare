import React from "react";
import { FiHome, FiUsers, FiCalendar, FiLogOut } from "react-icons/fi";
import "../Css/Admin.css";
import { Link } from "react-router-dom";
import Logo from "./logo";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>
        <Logo />
      </h2>
      <ul>
        <Link to="/admin/Dashboard">
          <li>
            <FiHome />
            <span>Dashboard</span>
          </li>
        </Link>
        <Link to="/admin/Caretaker">
          <li>
            <FiUsers />
            <span>Caretakers</span>
          </li>
        </Link>
        <Link to="/admin/User">
          <li>
            <FiUsers /> <span>Users</span>
          </li>
        </Link>
        <Link to="/admin/Booking">
          <li>
            <FiCalendar />
            <span>Bookings</span>
          </li>
        </Link>
        <li className="logout">
          <FiLogOut />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
