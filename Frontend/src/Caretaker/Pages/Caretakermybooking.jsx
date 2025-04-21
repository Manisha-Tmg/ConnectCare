import React, { useState, useEffect } from "react";
import { API } from "../../env";
import Cookies from "js-cookie";
import "../css/Booking.css";
import "../../output.css";

import {
  MapPin,
  Phone,
  CheckCircle,
  XCircle,
  User,
  Notebook,
  Calendar,
  Clock,
} from "lucide-react";
import CaretakerSidebar from "../Components/side";

const CaretakerBookingPortal = () => {
  const [bookings, setBookings] = useState([]);
  const [data, setData] = useState({});

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

  async function userdetails(id) {
    const token = Cookies.get("accessToken");
    try {
      const res = await fetch(`${API}api/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

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

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    return `${month} ${date.getDate()}, ${date.getFullYear()}`;
  };

  // Calculate days ago
  const calculateDaysAgo = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bookings-container">
      <CaretakerSidebar />
      <div className="booking-content">
        <div className="booking-header">
          <div>
            <h1 className="booking-title">Booking Requests</h1>
            <p className="booking-subtitle">
              Manage your upcoming caretaking appointments
            </p>
          </div>
        </div>

        {bookings.length === 0 ? (
          <p className="no-bookings">No new requests.</p>
        ) : (
          <div className="booking-list">
            {bookings.map((request) => (
              <div key={request.id} className="booking-card">
                <div className="booking-header">
                  <div className="client-info">
                    <div className="client-avatar">
                      {request.profile_url ? (
                        <img src={request.profile_url} alt={request.name} />
                      ) : (
                        <User size={20} />
                      )}
                    </div>
                    <div>
                      <div className="client-name">
                        {request.name || "Client"}
                      </div>
                      <div className="request-date">
                        {request.created_at
                          ? `${formatDate(
                              request.created_at
                            )} (${calculateDaysAgo(
                              request.created_at
                            )} days ago)`
                          : "Date not available"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="service-name">Care Request</div>

                <div className="booking-details-grid">
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span>
                      {request.start_date
                        ? formatDate(request.start_date)
                        : "N/A"}{" "}
                      -{" "}
                      {request.end_date ? formatDate(request.end_date) : "N/A"}
                    </span>
                  </div>
                  <div className="detail-item">
                    <Clock size={16} />
                    <span>{request.duration || "Duration not specified"}</span>
                  </div>
                  <div className="detail-item">
                    <User size={16} />
                    <span>1 patient</span>
                  </div>
                  <div className="detail-item">
                    <MapPin size={16} />
                    <span>Location: {request.location || "Not specified"}</span>
                  </div>
                </div>

                {request.note && (
                  <div className="special-needs">
                    <p className="detail-item">
                      <Notebook size={16} />
                      <span>
                        <strong>Special Needs:</strong> {request.note}
                      </span>
                    </p>
                  </div>
                )}

                <div className="detail-item">
                  <Phone size={16} />
                  <span>Contact: {request.number || "Not provided"}</span>
                </div>

                {request.price && (
                  <div className="booking-price">${request.price} per day</div>
                )}

                <div className="booking-footer">
                  <div className="status-badges">
                    {request.status === "pending" ? (
                      <>
                        <button
                          className="action-btn approve-btn"
                          onClick={() =>
                            updateBookingStatus(request.id, "Approved")
                          }
                        >
                          <CheckCircle size={14} /> Approve
                        </button>
                        <button
                          className="action-btn decline-btn"
                          onClick={() =>
                            updateBookingStatus(request.id, "Rejected")
                          }
                        >
                          <XCircle size={14} /> Decline
                        </button>
                      </>
                    ) : (
                      <div
                        className={`badge ${
                          request.status === "Approved"
                            ? "badge-approved"
                            : request.status === "Rejected"
                            ? "badge-rejected"
                            : request.status === "completed"
                            ? "badge-completed"
                            : ""
                        }`}
                      >
                        {request.status === "Approved" && (
                          <CheckCircle size={14} />
                        )}
                        {request.status === "Rejected" && <XCircle size={14} />}
                        {request.status === "completed" && (
                          <CheckCircle size={14} />
                        )}
                        <span>{request.status || "Unknown"}</span>
                      </div>
                    )}
                  </div>

                  <a
                    href={`/booking-details/${request.id}`}
                    className="view-details"
                  >
                    View Details ›
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {bookings.length > 0 &&
          bookings.some((booking) => booking.status === "Approved") && (
            <>
              <div className="note-box">
                <span>ℹ️</span>
                <span>
                  Note: You can view full details about active bookings in the
                  Ongoing section
                </span>
              </div>

              <div className="center-button">
                <button className="btn-view-bookings">
                  <span>View Active Bookings</span>
                  <span>›</span>
                </button>
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default CaretakerBookingPortal;
