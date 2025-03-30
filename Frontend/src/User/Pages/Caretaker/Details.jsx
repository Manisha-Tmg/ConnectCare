import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../css/Details.css";
import Header from "../../components/Header";
import { API } from "../../../env";
import Cookies from "js-cookie";

import { MdEmail, MdLanguage } from "react-icons/md";
import { FaPhone, FaRegCalendarDays } from "react-icons/fa6";
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
        const name = Cookies.set("name");
        console.log(name);
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
          <p className="Details-joined-date">
            <strong>Hourly Rate:</strong> ${caretaker.hourly_rate}
          </p>
          <p className="Details-joined-date"></p>
          <hr />
          <h2 className="Details-section-title">About {caretaker.name}</h2>
          <p>
            <strong>Experience:</strong> {caretaker.experience} years ,
            {caretaker.previous_experience}
          </p>

          <p>
            <strong>Gender:</strong> {caretaker.gender}
          </p>
          <p>
            <strong>
              Specialty:
              <strong className="specialty"> {caretaker.specialty}</strong>
            </strong>
          </p>
          <p className="Details-about-text">{caretaker.bio}</p>
          <button className="Details-show-more">Show More</button>
        </div>

        {/* Right Side - Booking & Details */}
        <div className="Details-caretaker-sidebar">
          <Link to={"/BookCaretaker"}>
            <button className="Details-book-button">
              Create a new booking
            </button>
          </Link>
          <div className="Details-info-card">
            <h3>Available Areas</h3>
            <p>
              <FaMapMarkerAlt /> {caretaker.address}
            </p>
          </div>
          <div className="Details-info-card">
            <h3>Working Days:</h3>
            <p>
              <FaRegCalendarDays />
              {caretaker.working_days}
            </p>
          </div>

          <div className="Details-info-card">
            <h3>Language</h3>
            <p>
              <MdLanguage />
              {caretaker.languages_spoken
                ? caretaker.languages_spoken.split(",").map((lang, index) => (
                    <span key={index}>
                      {/* to separate the strings given by the user */}
                      {lang.trim()}
                    </span>
                  ))
                : "Not specified"}
            </p>
          </div>

          <div className="Details-info-card">
            <h3>For more information</h3>
            <p>
              <MdEmail /> {caretaker.email}
            </p>
            <p>
              <FaPhone /> {caretaker.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
