import React, { useEffect, useState } from "react";
import "../css/BookCaretaker.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Previous from "../components/Previous";
import { API } from "../../env";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BookCaretaker = () => {
  const [selectedCaretaker, setSelectedCaretaker] = useState(null);
  const [date, setDate] = useState("");
  const [number, setNumber] = useState("");
  const [location, setLocation] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [caretakers, setCaretakers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const bookLogin = () => {
    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("Please Login First");
      navigate("/login");
    } else {
      navigate("/bookcaretaker");
    }
  };
  const handleBooking = async () => {
    try {
      const token = Cookies.get("accessToken");

      if (!token) {
        toast.error("Session expired. Please log in again.");
        return;
      }

      if (!selectedCaretaker) {
        toast.error("Please select a caretaker before booking.");

        return;
      }

      // Convert date format to YYYY-MM-DD (Backend expects this)
      const dateObj = new Date(date);
      const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;

      const requestBody = {
        location: location,
        number: number,
        first_name: first_name,
        last_name: last_name,
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
      // Cookies.set("booking_id", data.booking_id);

      if (!response.ok) {
        throw new Error(data.detail || "Booking failed");
      }

      toast.success("Booking confirmed!");
      setIsOpen(false);
    } catch (error) {
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
      } catch (error) {}
    };
    fetchCaretakers();
  }, []);

  return (
    <div>
      <Header />
      <div className="user-container">
        <h1 className="user-title">
          <Previous />
          Book a Caretaker
        </h1>
        <div className="user-caretaker-grid">
          {caretakers.map((caretaker) => (
            <div
              key={caretaker.id}
              className="user-caretaker-card"
              onClick={() => {
                setSelectedCaretaker(caretaker);
                setIsOpen(true);
              }}
            >
              <h2 className="user-caretaker-name">Name: {caretaker.name}</h2>
              <p className="user-caretaker-text">
                Hourly Rate: {caretaker.hourly_rate}
              </p>
              <p className="user-caretaker-text">
                Experience: {caretaker.experience}
              </p>
              <p className="user-caretaker-text">
                Speciality: {caretaker.specialty}
              </p>
              <p className="user-caretaker-text">
                Status: {caretaker.is_available ? "Available" : "Not Available"}
              </p>
              <button className="user-book-button" onClick={bookLogin}>
                Book Now
              </button>
            </div>
          ))}
        </div>
        {isOpen && (
          <div className="user-modal" onClick={bookLogin}>
            <div className="user-modal-content">
              <h2 className="title">Book a Caretaker</h2>
              <input
                type="text"
                value={selectedCaretaker?.name}
                className="date-picker"
              />
              {/* <input
                placeholder="First Name"
                type="text"
                value={first_name}
                onChange={(e) => setfirst_name(e.target.value)}
                className="date-picker"
              />
              <input
                placeholder="Last Name"
                type="text"
                value={last_name}
                onChange={(e) => setlast_name(e.target.value)}
                className="date-picker"
              /> */}
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="date-picker"
              />
              <input
                placeholder="Number"
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="date-picker"
              />
              <input
                placeholder="Location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="date-picker"
              />

              <button className="user-confirm-button" onClick={handleBooking}>
                Confirm Booking
              </button>
              <button
                className="user-close-button"
                onClick={() => setIsOpen(false)}
              >
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
