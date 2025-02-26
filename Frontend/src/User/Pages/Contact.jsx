import React from "react";
import "../css/Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>
        If you are looking for professional caretakers, feel free to reach out
        to us! At ConnectCare, we are dedicated to providing you with the best
        care for your loved ones. Whether you're looking for someone to assist
        with daily activities or provide specialized care, we are here to help.
      </p>
      <p>
        Our team of experienced caretakers is available to support individuals
        in need, ensuring comfort and safety at all times. Please do not
        hesitate to contact us with any questions, concerns, or to inquire about
        our services.
      </p>
      <p>
        Email:
        <a href="mailto:Connectcare@connectcare.com">contact@connectcare.com</a>
        <br />
        Phone: +0000 000 000
        <br />
        Address: 123 Care St., Kathmandu, Nepal
      </p>
    </div>
  );
};

export default Contact;
