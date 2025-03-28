import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/BookCaretakerDetails.css";
import Header from "../../components/Header";
import { API } from "../../../env";
import { FaStar, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { ImCross } from "react-icons/im";

const Details = () => {
  const { id } = useParams();
  const [caretaker, setCaretaker] = useState(null);

  useEffect(() => {
    const fetchCaretaker = async () => {
      try {
        const res = await fetch(`${API}api/caretakers/${id}`);
        const data = await res.json();
        setCaretaker(data);
      } catch (error) {
        console.error("Error fetching caretaker data", error);
      }
    };
    fetchCaretaker();
  }, [id]);

  if (!caretaker) return <p>Loading...</p>;

  return (
    <div>
      <Header />
      <div className="Details-caretaker-container">
        {/* Left Side - Profile Info */}
        <div className="Details-caretaker-profile">
          <img
            src={caretaker.image_url}
            alt={caretaker.name}
            className="Details-profile-img"
          />
          <h1 className="Details-caretaker-name">
            {caretaker.name}
            {caretaker.is_approved ? (
              <MdVerified className="Details-verified-icon" />
            ) : (
              <ImCross className="Details-verified-icon" />
            )}
          </h1>

          <p className="Details-joined-date">
            Joined {new Date(caretaker.created_at).toISOString().split("T")[0]}
          </p>
          <hr />
          <h2 className="Details-section-title">About {caretaker.name}</h2>
          <p>
            <strong>Experience:</strong> {caretaker.experience} years
          </p>
          <p className="Details-about-text">{caretaker.bio}</p>
          <button className="Details-show-more">Show More</button>
          <h2 className="Details-section-title">Reviews</h2>
          <p className="Details-no-reviews">
            No reviews yet. Be the first to review {caretaker.name}.
          </p>
          <button className="Details-write-review">Write a review</button>
        </div>

        {/* Right Side - Booking & Details */}
        <div className="Details-caretaker-sidebar">
          <button className="Details-book-button">Create a new booking</button>
          <p className="Details-or-text">OR</p>

          <div className="Details-info-card">
            <h3>Available Areas</h3>
            <p>
              <FaMapMarkerAlt /> {caretaker.address}
            </p>
          </div>

          <div className="Details-info-card">
            {caretaker.languages_spoken
              ? caretaker.languages_spoken.split(",").map((lang, index) => (
                  <span key={index} className="Details-language-tag">
                    {/* to separate the strings given by the user */}
                    {lang.trim()}{" "}
                  </span>
                ))
              : "Not specified"}
          </div>

          <div className="Details-info-card">
            <h3>Response Time</h3>
            <p>
              <FaClock /> Usually responds within 1 hour
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
