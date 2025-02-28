import React from "react";
import "../Css/Admin.css";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([
    { id: 101, user: "Alice", caretaker: "John Doe", date: "2025-03-05" },
    { id: 102, user: "Bob", caretaker: "Jane Smith", date: "2025-03-07" },
  ]);
  return (
    <div className="card">
      <h3>Bookings</h3>
      <ul className="booking-list">
        {bookings.map((booking) => (
          <li key={booking.id}>
            <span>
              {booking.user} booked {booking.caretaker} on {booking.date}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingManagement;
