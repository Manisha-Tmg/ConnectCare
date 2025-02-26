import React from "react";
import "../css/ServiceCards.css";

const services = [
  { name: "Babysitter", icon: "👶" },
  { name: "Pet Sitter", icon: "🐾" },
  { name: "Senior Caregiver", icon: "🧓" },
  { name: "Special Needs Caregiver", icon: "♿" },
];

const ServiceCards = () => {
  return (
    <section className="service-cards">
      <h2>What Caretaker We Offer</h2>
      <div className="service-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <p className="service">{service.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceCards;
