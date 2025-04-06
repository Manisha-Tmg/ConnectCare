import React from "react";
import "../css/Header.css";

const NotificationDropdown = ({ notifications = [] }) => {
  return (
    <div className="dropdown-menu notification-dropdown">
      <p className="dropdown-header">Notifications</p>

      {notifications.length === 0 ? (
        <p className="dropdown-item">No new notifications</p>
      ) : (
        notifications.map((notification, index) => (
          <p key={index} className="dropdown-item">
            {notification.message}
          </p>
        ))
      )}
    </div>
  );
};

export default NotificationDropdown;
