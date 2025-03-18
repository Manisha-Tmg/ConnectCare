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
      const res = await fetch(`${API}caretaker/bookings/${id}/action/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action: action }),
      });

      if (res.ok) {
        setBookings((prevBookings) =>
          prevBookings.map(
            (booking) =>
              booking.id === id ? { ...booking, status: action } : booking //unchanged in booking doesnt match
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
    <div>
      <CaretakerSidebar />
      <div className="caretake-container">
        <div className="caretake-header">
          <div className="caretake-header-cell">Request</div>
        </div>

        {bookings.map((request) => (
          <div key={request.id} className="caretake-request-row">
            <div className="caretake-profile">
              <div className="caretaker-info">
                <div className="profile-icon">
                  {request.first_name[0]}
                  {request.last_name[0]}
                </div>
              </div>
              <div className="caretake-user-info">
                <div className="name">
                  {request.first_name} {request.last_name}
                </div>
                <div className="email">{request.location}</div>
                <div className="number">{request.number}</div>
              </div>
            </div>

            <div className="caretake-actions">
              {/* Show Accept/Reject buttons only if status is Pending */}
              {request.status === "Pending" ? (
                <>
                  <button
                    className="caretake-btn  caretake-btn-accept"
                    onClick={() => fetchBookingstatus(request.id, "accept")}
                  >
                    Accept
                  </button>
                  <button
                    className="caretake-btn caretake-btn-reject"
                    onClick={() => fetchBookingstatus(request.id, "reject")}
                  >
                    Reject
                  </button>
                </>
              ) : (
                // If status is Accepted or Rejected, show the respective status
                <span className={`status-${request.status}`}>
                  {request.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaretakerBookingPortal;
