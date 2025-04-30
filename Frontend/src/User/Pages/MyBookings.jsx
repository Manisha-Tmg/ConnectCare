import Header from "../components/Header";
import "../css/setting.css";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { API } from "../../env";
import Footer from "../components/Footer";

const BookingPanel = () => {
  const [bookings, setBookings] = useState([]);
  const [caretakers, setCaretakers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("accessToken");

      try {
        // Fetch Bookings
        const resBooking = await fetch(`${API}api/bookings/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const bookingData = await resBooking.json();
        setBookings(bookingData);
      } catch (error) {
        console.error("Error fetching booking or caretaker data:", error);
      }
    };

    fetchData();
  }, []);

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
                <th>Date</th> <th>Number</th>
                <th>Caretaker</th>
                <th>Location</th>
                <th>Status</th>
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No bookings found.</td>
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
