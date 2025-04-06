// src/components/ProfileDropdown.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";

const ProfileDropdown = ({ username, onLogout }) => {
  return (
    <div className="dropdown-menu">
      <p className="dropdown-header">
        Signed in as <br /> <strong>{username}</strong>
      </p>
      <Link to="/profile" className="dropdown-item logout">
        My Profile
      </Link>
      <Link to="/change-password" className="dropdown-item logout">
        Change Password
      </Link>
      <Link to="/booking-details/:booking_id" className="dropdown-item logout">
        Booking Details
      </Link>
      <p onClick={onLogout} className="dropdown-item logout">
        Log Out
      </p>
    </div>
  );
};

export default ProfileDropdown;
