import React, { useState, useEffect } from "react";
import "../css/Booking.css";
import Previous from "../../components/Previous";
import CaretakerSidebar from "../../components/side";
const CaretakerBookingPortal = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const mockBookings = [
        {
          id: 1,
          user: "John Doe",
          location: "123 Main Street, Springfield",
          status: "Pending",
        },
        {
          id: 2,
          user: "Jane Smith",
          location: "SuperMart, Downtown",
          status: "Confirmed",
        },
      ];
      setBookings(mockBookings);
    };

    fetchBookings();
  }, []);

  const updateBookingStatus = (id, status) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      )
    );
  };

  return (
    <div className="caretaker-booking-portal">
      <CaretakerSidebar />
      <h2>
        <Previous />
        Bookings
      </h2>
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <ul className="booking-list">
          {bookings.map((booking) => (
            <li key={booking.id} className="booking-card">
              <h3>{booking.task}</h3>
              <p>
                <strong>Booked By:</strong> {booking.user}
              </p>
              <p>
                <strong>Location:</strong> {booking.location}
              </p>

              <p>
                <strong>Status:</strong> {booking.status}
              </p>
              <div className="booking-actions">
                {booking.status === "Pending" && (
                  <>
                    <button
                      onClick={() =>
                        updateBookingStatus(booking.id, "Confirmed")
                      }
                      className="accept-btn"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        updateBookingStatus(booking.id, "Declined")
                      }
                      className="decline-btn"
                    >
                      Decline
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CaretakerBookingPortal;
