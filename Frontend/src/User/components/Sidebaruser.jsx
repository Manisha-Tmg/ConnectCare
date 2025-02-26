import React from "react";
import "../css/Changepassword.css";
import Maria from "../../assets/julia.jpg";
import { LuLogOut } from "react-icons/lu";

const Sidebaruser = () => {
  return (
    <div>
      <div className="container-password">
        <div className="sidebar-password">
          <img src={Maria} alt="Profile" className="profile-image" />
          <h2>Manisha Tamang</h2>
          <nav>
            <a className="nav-link-password">
              <i className="mr-2">👤</i>Your Profile
            </a>
            <a className="nav-link-password">
              <i className="mr-2">🔒</i>Change Password
            </a>
            <a className="nav-link-password">
              <i className="mr-2">⚙️</i>Booking Details
            </a>
          </nav>
          <button className="logout-btn-password">
            <i className="icon">
              <LuLogOut />
            </i>
            Logout
          </button>
        </div>
      </div>
      ;
    </div>
  );
};

export default Sidebaruser;
