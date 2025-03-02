import React, { useEffect, useState } from "react";
import "../css/BookCaretaker.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Previous from "../components/Previous";
import { API } from "../../env";
import Cookies from "js-cookie";

const BookCaretaker = () => {
  const [selectedCaretaker, setSelectedCaretaker] = useState(null);
  const [date, setDate] = useState("");
  const [caretakers, setCaretakers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleBooking = async () => {
    try {
      const token = Cookies.get("accessToken");
      const userId = Cookies.get("user_id");

      if (!token) {
        alert("Session expired. Please log in again.");
        return;
      }

      if (!userId) {
        alert("User not found. Please log in again.");
        return;
      }

      console.log("Sending Access Token:", token);

      const response = await fetch(`${API}api/book_caretaker/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          caretaker_id: selectedCaretaker.id,
          booking_date: new Date(date).toISOString(),
          status: "Pending",
        }),
      });

      console.log("Booking Request Data:", {
        user_id: userId,
        caretaker_id: selectedCaretaker.id,
        booking_date: new Date(date).toISOString(),
        status: "Pending",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Booking failed");
      }

      alert("Booking confirmed");
      setIsOpen(false);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    const fetchCaretakers = async () => {
      try {
        const res = await fetch(`${API}api/caretakers/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setCaretakers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCaretakers();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <h1 className="title">
          <Previous />
          Book a Caretaker
        </h1>
        <div className="caretaker-grid">
          {caretakers.map((caretaker) => (
            <div
              key={caretaker.id}
              className="caretaker-card"
              onClick={() => {
                setSelectedCaretaker(caretaker);
                setIsOpen(true);
              }}
            >
              <h2 className="caretaker-name">Name: {caretaker.name}</h2>
              <p className="caretaker-text">
                Hourly Rate: {caretaker.hourly_rate}
              </p>
              <p className="caretaker-text">
                Experience: {caretaker.experience}
              </p>
              <p className="caretaker-text">
                Speciality: {caretaker.specialty}
              </p>
              <p className="caretaker-text">
                Status: {caretaker.is_available ? "Available" : "Not Available"}
              </p>
            </div>
          ))}
        </div>

        {isOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Book {selectedCaretaker?.name}</h2>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="date-picker"
              />
              <button className="confirm-button" onClick={handleBooking}>
                Confirm Booking
              </button>
              <button className="close-button" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BookCaretaker;
