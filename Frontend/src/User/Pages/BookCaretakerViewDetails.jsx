import React, { useEffect, useState } from "react";
import "../css/BookCaretaker.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { API } from "../../env";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Previous from "../components/Previous";
import { MdVerified } from "react-icons/md";
import { ImCross } from "react-icons/im";

const BookCaretakerdetails = () => {
  const [caretakers, setCaretakers] = useState([]);
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
          <Previous />
          Book a Caretaker
        </h1>
        <div className="user-caretaker-grid">
          {caretakers.map((caretaker) => (
            <div key={caretaker.id} className="user-caretaker-card">
              <div className="verified-badge">
                {caretaker.is_approved ? "Verified " : "Not Verified "}
              </div>
              {/* //     <MdVerified className="icon-verified" />
              //   ) : (
              //     <ImCross className="icon-verified" />
              //   )}
              // </div> */}

              <img
                src={caretaker.profile_picture_url}
                alt={caretaker.name}
                className="caretaker-image"
              />
              <h2 className="user-caretaker-name">{caretaker.name}</h2>
              <div className="user-caretaker-languages">
                {caretaker.languages_spoken
                  ? caretaker.languages_spoken.split(",").map((lang, index) => (
                      <span key={index} className="language-tag">
                        {/* to separate the strings given by the user */}
                        {lang.trim()}{" "}
                      </span>
                    ))
                  : "Not specified"}
              </div>

              <div className="location-tags">
                <span className="tag">
                  {caretaker.address
                    ? caretaker.address.split(",").map((lang, index) => (
                        <span key={index} className="location-tag">
                          {/* to separate the strings given by the user */}
                          {lang.trim()}
                        </span>
                      ))
                    : "Not specified"}
                </span>
              </div>
              <p className="user-caretaker-bio">
                {caretaker.bio?.length > 100
                  ? `${caretaker.bio.substring(0, 135)}................`
                  : caretaker.bio}
              </p>
              <Link
                to={`/caretakerDetails/${caretaker.id}`}
                style={{ textDecoration: "none" }}
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
