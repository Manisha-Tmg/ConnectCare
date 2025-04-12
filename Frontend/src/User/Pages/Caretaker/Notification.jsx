import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { API } from "../../../env";
import "../../css/CaretakerDashboard.css";
import {
  CheckCircle,
  XCircle,
  User,
  MapPin,
  Phone,
  DollarSign,
} from "lucide-react";

const CaretakerDashboardss = () => {
  const [bookings, setBookings] = useState([]);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = Cookies.get("accessToken");
      try {
        const res = await fetch(`${API}api/caretaker/bookings/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const updateBookingStatus = async (id, action) => {
    const token = Cookies.get("accessToken");
    try {
      const res = await fetch(`${API}caretaker/bookings/${id}/action/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === id ? { ...booking, status: action } : booking
          )
        );
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  return (
    <div className="caretaker-dashboard">
      <div className="sidebar">
        <h2>ConnectCare</h2>
        <ul>
          <li>Dashboard</li>
          <li>Bookings</li>
          <li>Earnings</li>
          <li>Profile</li>
        </ul>
      </div>
      <div className="dashboard-content">
        <h2>Dashboard</h2>
        <div className="stats">
          <div className="stat-box">
            <DollarSign size={24} />
            <p>Earnings: ${earnings}</p>
          </div>
        </div>
        <h3>Booking Requests</h3>
        <div className="booking-list">
          {bookings.length === 0 ? (
            <p>No new requests.</p>
          ) : (
            bookings.map((request) => (
              <div key={request.id} className="booking-card">
                <div className="user-info">
                  <User size={20} />
                  <h3>
                    {request.first_name} {request.last_name}
                  </h3>
                </div>
                <p>
                  <MapPin size={16} /> {request.location}
                </p>
                <p>
                  <Phone size={16} /> {request.number}
                </p>
                <div className="booking-actions">
                  {request.status === "Pending" ? (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() =>
                          updateBookingStatus(request.id, "Accepted")
                        }
                      >
                        <CheckCircle size={16} /> Accept
                      </button>
                      <button
                        className="decline-btn"
                        onClick={() =>
                          updateBookingStatus(request.id, "Rejected")
                        }
                      >
                        <XCircle size={16} /> Reject
                      </button>
                    </>
                  ) : (
                    <span className={`status ${request.status.toLowerCase()}`}>
                      {request.status}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CaretakerDashboardss;
