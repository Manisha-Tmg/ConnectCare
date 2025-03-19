import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebaruser";
import "../css/setting.css";
import Cookies from "js-cookie";
import { API } from "../../env";

const BookingDetails = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchBooking() {
      const token = Cookies.get("accessToken");

      if (!token) {
        console.error("Missing authentication details");
        return;
      }

      try {
        const res = await fetch(`${API}api/bookings/`, {
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
        {data ? (
          <table className="booking-table">
            <thead>
              <tr>
                <th>Caretaker name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Number</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((booking) => (
                <tr key={booking.id}>
                  <td className="rowww">{booking.name}</td>
                  <td>
                    {new Date(booking.booking_date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </td>

                  <td className="rowww">{booking.location}</td>
                  <td>{booking.number}</td>
                  <td className="rowww">{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading booking details...</p>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;
