import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "../css/Header.css";
import { API } from "../../env";

const NotificationDropdown = ({ userId }) => {
  const [data, setData] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    const token = Cookies.get("accessToken");

    const fetchNotifications = async () => {
      if (!token) {
        console.error("Missing authentication details");
        return;
      }

      try {
        const res = await fetch(`${API}api/users/notification/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch notifications");

        const result = await res.json();
        setData(result);
        setHasUnread(result.some((item) => !item.is_read));
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();

    // WebSocket for real-time notifications
    const socket = new WebSocket(
      `ws://localhost:8000/ws/notifications/${userId}/`
    );

    socket.onmessage = (event) => {
      const dataReceived = JSON.parse(event.data);
      const newNotification = {
        message: dataReceived.message,
        is_read: false,
        created_at: new Date().toISOString(),
      };
      setData((prev) => [newNotification, ...prev]);
      setHasUnread(true);
    };

    return () => {
      socket.close();
    };
  }, [userId]);

  return (
    <div className="notification-wrapper">
      {/* Trigger with red dot */}
      <div className="notification-icon-wrapper">
        <i className="fa fa-bell"></i>
        {hasUnread && <span className="notification-dot"></span>}
      </div>

      <div className="notification-dropdown-menu">
        <p className="notification-dropdown-header">Notifications</p>

        {data.length === 0 ? (
          <p className="notification-dropdown-item">No new notifications</p>
        ) : (
          data.map((datas, index) => (
            <p
              key={index}
              className={`notification-dropdown-item ${
                !datas.is_read ? "unread-notification" : ""
              }`}
            >
              {datas.message}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
