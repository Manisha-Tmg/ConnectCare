import React, { useState } from "react";
import "../css/BookCaretaker.css";
import photo from "../../assets/Profile.jpg";
import Maria from "../../assets/julia.jpg";
import joordan from "../../assets/joordan.jpg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Previous from "../components/Previous";

const caretakers = [
  {
    id: 1,
    name: "Maria Johnson",
    rating: 4.8,
    image: Maria,
  },
  {
    id: 2,
    name: "Jordan Smith",
    rating: 4.5,
    image: joordan,
  },
  {
    id: 3,
    name: "Julia Smith",
    rating: 4.5,
    image: photo,
  },
];

const BookCaretaker = () => {
  const [selectedCaretaker, setSelectedCaretaker] = useState(null);
  const [date, setDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Header />
      <div className="container">
        <h1 className="title">
          <Previous />
          Book a Caretaker
        </h1>
        <input
          type="text"
          placeholder="Search caretakers..."
          className="search-input"
        />

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
              <img
                src={caretaker.image}
                alt={caretaker.name}
                className="caretaker-image"
              />
              <h2 className="caretaker-name">{caretaker.name}</h2>
              <p className="caretaker-rating">⭐ {caretaker.rating} Rating</p>
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
