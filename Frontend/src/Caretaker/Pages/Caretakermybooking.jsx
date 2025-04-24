import React, { useState, useEffect } from "react";
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
import { API } from "../../env";
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
                <div className="booking-header-new">
                  <div className="client-info">
                    <div className="client-avatar">
                      {request.profile_url ? (
                        <img
                          src={request.profile_url}
                          alt={`${request.first_name} ${request.last_name}`}
                          className="rounded-full w-10 h-10 object-cover"
                        />
                      ) : (
                        <div className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center">
                          <User size={20} />
                        </div>
                      )}
                    </div>
                    <div className="client-details">
                      <div className="client-name font-medium">
                        {request.name ? request.name : "Rina Thapa"}
                      </div>
                    </div>
                  </div>

                  <div className="status-badges-new">
                    {request.status === "Pending" ? (
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
                      <>
                        {request.status === "Approved" && (
                          <div className="status-badge accepted">
                            <CheckCircle size={16} className="text-green-500" />
                            <span>Accepted</span>
                          </div>
                        )}
                        {request.status === "completed" && (
                          <div className="status-badge completed">
                            <CheckCircle size={16} className="text-blue-500" />
                            <span>Completed</span>
                          </div>
                        )}
                        {request.status === "Rejected" && (
                          <div className="status-badge rejected">
                            <XCircle size={16} className="text-red-500" />
                            <span>Rejected</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="booking-details-grid-new">
                  <div className="detail-item-new">
                    <MapPin size={16} className="text-gray-500" />
                    <span className="text-sm">
                      From {request.location || "Kathmandu"}
                    </span>
                  </div>
                </div>

                {request.note && (
                  <div className="special-needs">
                    <p className="detail-item-new">
                      <Notebook size={16} className="text-gray-500" />
                      <span className="text-sm">
                        <strong>Special Needs:</strong> {request.note}
                      </span>
                    </p>
                  </div>
                )}

                {request.number && (
                  <div className="detail-item-new">
                    <Phone size={16} className="text-gray-500" />
                    <span className="text-sm">Contact: {request.number}</span>
                  </div>
                )}

                <div className="booking-footer-new">
                  <div className="estimated-price">
                    <div className="price-label text-sm text-gray-500">
                      Estimated Price (USD)
                    </div>
                    <div className="price-amount text-lg font-semibold text-blue-600">
                      ${request.price || "118"}
                    </div>
                  </div>
                </div>

                <div className="booking-actions">
                  {request.status === "pending" ? (
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
