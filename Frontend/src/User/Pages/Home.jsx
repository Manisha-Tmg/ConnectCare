import React from "react";
import "../css/Body.css";
import Body from "./Body";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();

  const handleFindCaretaker = () => {
    const token = Cookies.get("accessToken");

    if (!token) {
      // alert("Please login first");
      toast.error("Please Login First");

      navigate("/login");
    } else {
      navigate("/bookcaretaker");
    }
  };

  return (
    <div className="mannn">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="highlight">
            Find Trusted<br></br> Caretakers Effortlessly
          </h1>
          <p className="text">
            Welcome to ConnectCare! Find trusted and compassionate caretakers
            for your loved ones with ease. Book professional caregivers tailored
            to your needs and ensure the best care at your convenience.
          </p>
          {/* <div className="main-image">
            <img src={Background} alt="image" />
          </div>{" "} */}
        </div>
        <div className="hero-form">
          <button className="get-started" onClick={handleFindCaretaker}>
            Find a Caretaker
          </button>
        </div>
      </section>
      <Body />
    </div>
  );
};

export default HomePage;
