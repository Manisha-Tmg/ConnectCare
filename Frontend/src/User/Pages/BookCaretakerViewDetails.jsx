import React, { useEffect, useState } from "react";
import "../css/BookCaretaker.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { API } from "../../env";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Previous from "../components/Previous";

const BookCaretakerdetails = () => {
  const [caretakers, setCaretakers] = useState([]);
  const [favorites, setFavorites] = useState({});
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

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
        console.error("Error fetching caretakers:", error);
      }
    };

    fetchCaretakers();
  }, []);

  return (
    <div>
      <Header />
      <div className="user-container">
        <h1 className="user-title">
          {/* <Previous /> */}
          Book a Caretaker
        </h1>
        <div className="user-caretaker-grid">
          {caretakers.map((caretaker) => (
            <div key={caretaker.id} className="user-caretaker-card">
              <div className="caretaker-header">
                <img
                  src={caretaker.profile_picture_url}
                  alt={caretaker.name}
                  className="caretaker-image"
                />
                <div className="caretaker-header-info">
                  <div className="caretaker-name-container">
                    <h2 className="caretaker-name">{caretaker.name}</h2>
                  </div>
                  <div className="caretaker-stats">
                    <span>
                      {caretaker.experience || "0"} years experience |
                      <span className="star-rating">★</span>
                      {caretaker.rating || "4.0"}
                    </span>
                    <span>{caretaker.hourly_rate || "Rs. 300"}/hr</span>
                  </div>
                </div>
              </div>

              <div className="language-tags-container">
                {caretaker.languages_spoken
                  ? caretaker.languages_spoken.split(",").map((lang, index) => (
                      <span key={index} className="language-tag">
                        {lang.trim()}
                      </span>
                    ))
                  : "Languages not specified"}
              </div>

              <div className="location-tags-container">
                {caretaker.address
                  ? caretaker.address.split(",").map((addr, index) => (
                      <span key={index} className="location-tag">
                        {addr.trim()}
                      </span>
                    ))
                  : "Address not specified"}
              </div>

              <p className="caretaker-bio">
                {caretaker.bio?.length > 100
                  ? `${caretaker.bio.substring(0, 135)}...`
                  : caretaker.bio || "No bio provided"}
              </p>

              <Link
                to={`/caretakerDetails/${caretaker.id}`}
                style={{ textDecoration: "none" }}
                className="view-details-link"
              >
                <button className="view-details-btn">View Details</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookCaretakerdetails;
