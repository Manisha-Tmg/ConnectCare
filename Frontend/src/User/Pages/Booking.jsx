import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../css/caretakerboook.css";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { API } from "../../env";
import { useNavigate, useParams } from "react-router-dom";

const BookingFormPreview = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState(null);
  const [price, setPrice] = useState(null);
  const [caretaker, setCaretaker] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const token = Cookies.get("accessToken");

  useEffect(() => {
    const fetchCaretaker = async () => {
      try {
        const response = await fetch(`${API}api/caretakers/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        setCaretaker(data);
      } catch (error) {
        console.error("Error fetching caretaker details:", error);
      }
    };

    fetchCaretaker();
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("accessToken");
        const userId = Cookies.get("user_id");

        if (!token || !userId) {
          console.error("Missing authentication details");
          return;
        }

        const response = await fetch(`${API}api/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUser();
  }, []);

  const handleBooking = async () => {
    try {
      const token = Cookies.get("accessToken");

      if (!token) {
        toast.error("Session expired. Please log in again.");
        return;
      }

      if (!date || !time) {
        toast.error("Please select both date and time.");
        return;
      }

      const dateTimeString = `${date}T${time}:00`; // combine date t and time- 2025-04-14T21:00:00

      const requestBody = {
        location,
        note,
        number,
        price,
        caretaker_id: caretaker?.id,
        booking_date: dateTimeString,
        name: user?.name || "",
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
      navigate("/");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <h2 className="headh2">Book Your Caretaker</h2>
        <div className="form-section">
          <h3>Booking Details</h3>

          {caretaker && (
            <div className="form-group">
              <label className="label">Caretaker Name</label>
              <input
                type="text"
                className="input"
                value={caretaker.name}
                disabled
              />
            </div>
          )}

          {user && (
            <div className="form-group">
              <label className="label">User Name</label>
              <input type="text" className="input" value={user.name} disabled />
            </div>
          )}

          <label className="label">Date</label>
          <input
            type="date"
            className="input"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />

          <label className="label">Time</label>
          <input
            type="time"
            className="input"
            onChange={(e) => setTime(e.target.value)}
            value={time}
          />

          <label className="label">Number</label>
          <input
            type="number"
            className="input"
            onChange={(e) => setNumber(e.target.value)}
            value={number}
          />
          <label className="label">Price</label>
          <input
            type="number"
            className="input"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Location & Notes</h3>

        <label className="label">Location</label>
        <input
          type="text"
          className="input"
          placeholder="Enter location"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />

        <label className="label">Additional Note</label>
        <input
          type="text"
          className="input"
          placeholder="Any specific instructions"
          onChange={(e) => setNote(e.target.value)}
          value={note}
        />

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
