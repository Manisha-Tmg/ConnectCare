import React, { useState, useEffect } from "react";
import { API } from "../../env";
import Cookies from "js-cookie";
import "../css/Booking.css";
import {
  MapPin,
  Phone,
  CheckCircle,
  XCircle,
  User,
  Notebook,
} from "lucide-react";
import CaretakerSidebar from "../Components/side";

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

        if (!res.ok) throw new Error("Failed to fetch bookings");

        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBooking();
  }, []);

  const updateBookingStatus = async (id, action) => {
    const token = Cookies.get("accessToken");

    // Convert "Approved" -> "accept", "Rejected" -> "reject"
    const actionMap = {
      Approved: "accept",
      Rejected: "reject",
    };

    const formattedAction = actionMap[action];

    if (!formattedAction) {
      console.error("Invalid action provided");
      return;
    }

    try {
      const res = await fetch(`${API}caretaker/bookings/${id}/action/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action: formattedAction }),
      });

      if (res.ok) {
        setBookings((prev) =>
          prev.map((booking) =>
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
    <div className="bookings-container">
      <CaretakerSidebar />
      <div className="booking-content">
        <h2 className="booking-title">Booking Requests</h2>
        {bookings.length === 0 ? (
          <p className="no-bookings">No new requests.</p>
        ) : (
          <div className="booking-list">
            {bookings.map((request) => (
              <div key={request.id} className="booking-card">
                <div className="user-info">
                  <div className="user-avatar">
                    <User size={20} color="white" />
                  </div>
                  <div>
                    <h3></h3>
                    <p className="booking-type">
                      Name • {request.first_name} {request.last_name}
                    </p>
                  </div>
                </div>

                <div className="booking-details">
                  <p>
                    <MapPin size={16} /> <strong>From:</strong>
                    {request.location}
                  </p>

                  <p>
                    <Notebook size={16} />
                    <strong>Special Needs:</strong> {request.note}
                  </p>

                  <p>
                    <Phone size={16} /> <strong>Contact:</strong>{" "}
                    {request.number}
                  </p>
                </div>

                <div className="booking-actions">
                  {request.status === "Pending" ? (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() =>
                          updateBookingStatus(request.id, "Approved")
                        }
                      >
                        <CheckCircle size={16} /> Approve
                      </button>
                      <button
                        className="decline-btn"
                        onClick={() =>
                          updateBookingStatus(request.id, "Rejected")
                        }
                      >
                        <XCircle size={16} /> Decline
                      </button>
                    </>
                  ) : (
                    <span className={`status ${request.status.toLowerCase()}`}>
                      {request.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CaretakerBookingPortal;
