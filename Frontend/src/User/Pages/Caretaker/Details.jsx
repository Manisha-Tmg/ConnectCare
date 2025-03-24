import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/BookCaretaker.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { API } from "../../../env";
import Backbtn from "../../components/Backbtn";
import Previous from "../../components/Previous";

const Details = () => {
  const navigate = useNavigate();
  const [caretakers, setCaretakers] = useState([]);
  const location = useLocation();
  const caretaker = location.state;

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
              // onClick={() => {
              //   setSelectedCaretaker(caretaker);
              //   setIsOpen(true);
              // }}
            >
              <img
                src={caretaker.image_url}
                alt={caretaker.name}
                className="caretaker-image"
              />
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
              <button className="user-book-button">View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
