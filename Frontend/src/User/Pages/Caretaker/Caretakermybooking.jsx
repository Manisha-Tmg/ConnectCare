import React, { useState, useEffect } from "react";
import "../../css/Booking.css";
import Previous from "../../components/Previous";
import CaretakerSidebar from "../../components/side";
import { API } from "../../../env";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const CaretakerBookingPortal = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const fetchBooking = async () => {
      const res = await fetch(`${API}api/caretaker/bookings/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    };

    fetchBooking();
  }, []);

  const fetchBookingstatus = async () => {
    const id = Cookies.get("booking_id");

    const res = await fetch(`${API}caretaker/bookings/${id}/action/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(),
    });
  };

  return (
    <div className="caretaker-booking-portal">
      <CaretakerSidebar />
      <h2>
        <Previous />
        Request
      </h2>
    </div>
  );
};

export default CaretakerBookingPortal;
