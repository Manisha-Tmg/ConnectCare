// import React, { useState } from "react";
import Header from "../components/Header";
import "../css/BookCaretaker.css";
import { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { API } from "../../env";
import { useParams } from "react-router-dom";

const BookingFormPreview = () => {
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [location, setlocation] = useState("");
  const { id } = useParams();

  const handleBooking = async () => {
    try {
      const token = Cookies.get("accessToken");

      if (!token) {
        toast.error("Session expired. Please log in again.");
        return;
      }

      //   if (!selectedCaretaker) {
      //     toast.error("Please select a caretaker before booking.");

      //     return;
      //   }

      // Convert date format to YYYY-MM-DD (Backend expects this)
      const dateObj = new Date(date);
      const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;

      const requestBody = {
        location: location,
        note: note,

        caretaker_id: selectedCaretaker.id,
        booking_date: formattedDate,
        status: "Pending",
      };

      const response = await fetch(`${API}api/book_caretaker/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Booking failed");
      }

      toast.success("Booking confirmed!");
      setIsOpen(false);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="booking-container">
        <div className="booking-header">
          <h2>Book Your Caretaker</h2>
          <p>Reliable care service at your convenience</p>
        </div>

        <div className="form-section">
          <h3>Booking Details</h3>
          <div className="form-group"></div>
          <div className="form-row">
            <div className="form-group">
              <label className="label">Date</label>
              <input
                type="date"
                id="date"
                className="input"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
            </div>
          </div>
        </div>
        <div className="form-section">
          <h3>Location & Notes</h3>
          <div className="form-group">
            <label className="label">Location</label>
            <input
              type="text"
              id="location"
              className="input"
              placeholder="Enter location"
              required
              onChange={(e) => setlocation(e.target.value)}
              value={location}
            />
          </div>
          <div className="form-group">
            <label className="label">Additional Note</label>
            <input
              type="text"
              id="note"
              className="input"
              placeholder="Any specific instructions"
              onChange={(e) => setNote(e.target.value)}
              value={note}
            />
          </div>
        </div>
        <div className="booking-actions">
          <button
            type="button"
            className="booking-button"
            onClick={handleBooking}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingFormPreview;
