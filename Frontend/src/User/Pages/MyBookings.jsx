import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebaruser";
import "../css/setting.css";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { API } from "../../env";

const BookingDetails = () => {
  const [data, setData] = useState(null);
  const id = useParams("booking_id");

  useEffect(() => {
    async function fetchBooking() {
      const token = Cookies.get("accessToken");

      if (!token || !id) {
        console.error("Missing authentication details");
        return;
      }

      try {
        const res = await fetch(`${API}api/bookings/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch Booking data");
        }

        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching Bokking:", error);
      }
    }

    fetchBooking();
  }, []);

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
