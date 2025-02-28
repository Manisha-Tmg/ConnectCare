import React, { useEffect, useState } from "react";
import "../css/BookCaretaker.css";
import photo from "../../assets/Profile.jpg";
import Maria from "../../assets/julia.jpg";
import joordan from "../../assets/joordan.jpg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Previous from "../components/Previous";
import { API } from "../../env";

const BookCaretaker = () => {
  const [selectedCaretaker, setSelectedCaretaker] = useState(null);
  const [date, setDate] = useState(null);

  const [booking, setBooking] = useState([]);
  const [caretakers, setCaretakers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const hanglebooking = async () => {
    try {
      const Token = localStorage.setItem("accessToken", data.access_token);
      const response = await fetch(`${API}api/book_caretaker/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body: {
          user_id: user_id,
          caretaker_id: selectedCaretaker.id,
          booking_date: new Date(date).toISOString(),
          status: "Pending",
        },
      });

      const data = await response.json();
      alert("Booking confirmed");
      isOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const handelCaretakerBooking = async () => {
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
    handelCaretakerBooking();
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
              {/* <img
                src={caretaker.image}
                alt={caretaker.name}
                className="caretaker-image"
              /> */}
              <h2 className="caretaker-name">Name: {caretaker.name}</h2>
              <p className="caretaker-text">
                Hourly Rate: {caretaker.hourly_rate}
              </p>
              <p className="caretaker-text">
                Experience:{caretaker.experience}
              </p>
              <p className="caretaker-text">
                Speciality: {caretaker.specialty}
              </p>
              <p className="caretaker-text">
                Status: {caretaker.is_available ? "Available" : "Not Available"}
              </p>
              {/* <p className="caretaker-text"></p> */}
              {/* <p className="caretaker-rating">⭐ {caretaker.rating} Rating</p> */}
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
              <button
                className="confirm-button"
                onClick={() => alert("Booking Confirmed!")}
              >
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
