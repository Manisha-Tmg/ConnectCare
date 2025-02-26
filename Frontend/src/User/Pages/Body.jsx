import React from "react";
import "../css/Body.css";

const Body = () => {
  return (
    <section id="about" className="about-section">
      <h2 className="about-heading">Why Choose Us?</h2>
      <p className="about-description">
        At CareTakerConnect, we connect families with professional caretakers
        who are compassionate and trustworthy. Our platform ensures a seamless
        booking experience, so you can focus on what truly matters.
      </p>
      <div className="features">
        <div className="feature-item">
          <div className="feature-icon">✔️</div>
          <h3>Verified Caretakers</h3>
          <p>All caretakers undergo thorough background checks and training.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">⏰</div>
          <h3>Flexible Scheduling</h3>
          <p>Book care services that fit your schedule and needs.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">💲</div>
          <h3>Affordable Pricing</h3>
          <p>Transparent pricing with no hidden costs.</p>
        </div>
      </div>
    </section>
  );
};

export default Body;
