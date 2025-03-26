import React, { useEffect, useState } from "react";
import "../css/BookCaretaker.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Previous from "../components/Previous";
import { API } from "../../env";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BookCaretakerdetails = () => {
  const [selectedCaretaker, setSelectedCaretaker] = useState(null);
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [location, setLocation] = useState("");
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
              <div className="verified-badge">Verified Guide</div>
              <img
                src={caretaker.image_url}
                alt={caretaker.name}
                className="caretaker-image"
              />
              <h2 className="user-caretaker-name">{caretaker.name}</h2>
              <p className="user-caretaker-languages">
                {caretaker.languages_spoken
                  ? caretaker.languages_spoken.split(",").join(", ")
                  : "Not specified"}
              </p>
              {/* <div className="caretaker-rating">
                ⭐ {caretaker.rating} ({caretaker.reviews} reviews)
              </div> */}
              <div className="location-tags">
                <span className="tag">{caretaker.address}</span>
              </div>
              <p className="user-caretaker-bio">{caretaker.bio}</p>
              <button className="view-details-btn" onClick={bookLogin}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookCaretakerdetails;
