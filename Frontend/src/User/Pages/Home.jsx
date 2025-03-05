import React, { useState, useEffect } from "react";
import "../css/Body.css";
import Body from "./Body";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const HomePage = () => {
  const navigate = useNavigate();

  const handleFindCaretaker = () => {
    const token = Cookies.get("accessToken");

    if (!token) {
      alert("Please login first");
      navigate("/login");
    } else {
      navigate("/bookcaretaker");
    }
  };

  return (
    <div>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Trusted Caretakers Effortlessly</h1>
          <p>
            Your loved ones deserve the best care. Book experienced caretakers
            with ease.
          </p>
          <div className="hero-form">
            <button className="get-started" onClick={handleFindCaretaker}>
              Find a Caretaker
            </button>
          </div>
        </div>
      </section>
      <Body />
    </div>
  );
};

export default HomePage;
