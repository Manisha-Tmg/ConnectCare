import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../css/caretakerboook.css";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { API } from "../../env";
import { useNavigate, useParams } from "react-router-dom";

const BookingFormPreview = () => {
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState(null);
  const [caretaker, setCaretaker] = useState(null);
  const [user, setUser] = useState(null); // Store user details
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch caretaker details
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

  // Fetch user details
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
        setUser(userData); // Store user details in state
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

      const dateObj = new Date(date);
      const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;

      const requestBody = {
        location: location,
        note: note,
        number: number,
        caretaker_id: caretaker?.id,
        booking_date: formattedDate,
        status: "Pending",
        first_name: user?.first_name,
        last_name: user?.last_name,
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
      <h2>Book Your Caretaker</h2>
      <div className="form-section">
        <h3>Booking Details</h3>

        {/* Caretaker Name (Read-Only) */}
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

        <label className="label">Date</label>
        <input
          type="date"
          className="input"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />

        <label className="label">Number</label>
        <input
          type="number"
          className="input"
          onChange={(e) => setNumber(e.target.value)}
          value={number}
        />
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
  );
};

export default BookingFormPreview;
