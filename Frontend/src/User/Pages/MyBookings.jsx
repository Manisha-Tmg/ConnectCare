import Header from "../components/Header";
import "../css/setting.css";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { API } from "../../env";
import Footer from "../components/Footer";

const BookingPanel = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const token = Cookies.get("accessToken");

    try {
      const resBooking = await fetch(`${API}api/bookings/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const bookingData = await resBooking.json();
      setBookings(bookingData);
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (booking_id) => {
    const token = Cookies.get("accessToken");

    const confirm = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`${API}api/bookings/${booking_id}/cancel/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      alert(data.detail);
      fetchBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="caretakers-panel">
        <div className="panels-header">
          <h1>My Bookings</h1>
        </div>

        <div className="caretakers-table-container">
          <table className="caretakers-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Number</th>
                <th>Caretaker</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{new Date(booking.booking_date).toLocaleString()}</td>
                    <td>{booking.number}</td>
                    <td>{booking.caretaker_name}</td>
                    <td>{booking.location}</td>
                    <td>
                      <span
                        className={`status-badge ${booking.status.toLowerCase()}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      {booking.status === "pending" ? (
                        <button
                          className="cancel-button"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Cancel
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPanel;
