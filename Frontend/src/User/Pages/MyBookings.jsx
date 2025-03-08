import Header from "../components/Header";
import Sidebar from "../components/Sidebaruser";
import "../css/setting.css";

const BookingDetails = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="booking-container">
        <h2>Booking Details</h2>
        <p>No bookings found.</p>
      </div>
    </div>
  );
};

export default BookingDetails;
