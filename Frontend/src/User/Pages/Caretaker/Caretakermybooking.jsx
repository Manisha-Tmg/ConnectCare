import React, { useState, useEffect } from "react";
import "../../css/Booking.css";
import Previous from "../../components/Previous";
import CaretakerSidebar from "../../components/side";
import { API } from "../../../env";

const CaretakerBookingPortal = () => {
  const [bookings, setBookings] = useState([]);
  const { booking_id } = useParams();

  useEffect(() => {
    const fetchBookingstatus = async () => {
      const res = await fetch(
        `${API}caretaker/bookings/${booking_id}/action/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );
    };
    fetchBookingstatus();
  }, []);

  // const updateBookingStatus = (id, status) => {
  //   setBookings(
  //     bookings.map((booking) =>
  //       booking.id === id ? { ...booking, status } : booking
  //     )
  //   );
  // };

  return (
    <div className="caretaker-booking-portal">
      <CaretakerSidebar />
      <h2>
        <Previous />
        Request
      </h2>
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
                    onClick={() => updateBookingStatus(booking.id, "Confirmed")}
                    className="accept-btn"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateBookingStatus(booking.id, "Declined")}
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
    </div>
  );
};

export default CaretakerBookingPortal;
