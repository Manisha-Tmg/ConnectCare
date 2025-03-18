import React, { useState, useEffect } from "react";
import "../../css/Booking.css";
import CaretakerSidebar from "../../components/side";
import { API } from "../../../env";
import Cookies from "js-cookie";

const CaretakerBookingPortal = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = Cookies.get("accessToken");

    const fetchBooking = async () => {
      try {
        const res = await fetch(`${API}api/caretaker/bookings/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setBookings(data); // Store the fetched data
        } else {
          console.error("Failed to fetch bookings");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBooking();
  }, []);

  const fetchBookingstatus = async (id, action) => {
    const token = Cookies.get("accessToken");

    try {
      const res = await fetch(`${API}api/caretaker/bookings/${id}/action/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: action }),
      });

      if (res.ok) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === id ? { ...booking, status: action } : booking
          )
        );
      } else {
        console.error("Failed to update booking status");
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  return (
    <div className="caretake-container">
      <div className="caretake-header">
        <div className="caretake-header-cell">NAME</div>
        <div className="caretake-header-cell right">ACTIONS</div>
      </div>

      {bookings.map((request) => (
        <div key={request.id} className="caretake-request-row">
          <div className="caretake-profile">
            <div className="caretake-user-info">
              <div className="name">
                {request.first_name} {request.last_name}
              </div>
              <div className="email">{request.location}</div>
            </div>
          </div>

          <div className="caretake-actions">
            <button
              className="caretake-btn btn-accept"
              onClick={() => fetchBookingstatus(request.id, "accepted")}
            >
              Accept
            </button>
            <button
              className="caretake-btn btn-reject"
              onClick={() => fetchBookingstatus(request.id, "rejected")}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CaretakerBookingPortal;
