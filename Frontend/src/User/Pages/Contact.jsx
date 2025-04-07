import React from "react";
import "../css/Contact.css";

const Contact = () => {
  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        <h1 className="contact-heading">Get in Touch with ConnectCare</h1>
        <p className="contact-text">
          Looking for professional caretakers? We're here to help! At
          <strong> ConnectCare</strong>, we are committed to providing the best
          care for your loved ones. Whether it’s daily support or specialized
          attention, our trusted caretakers are ready to assist.
        </p>
        <p className="contact-text">
          Your comfort and peace of mind are our priority. Don’t hesitate to
          reach out with any inquiries, feedback, or support needs.
        </p>

        <div className="contact-info">
          <p>
            📧 Email:{" "}
            <a href="mailto:contact@connectcare.com" className="contact-link">
              contact@connectcare.com
            </a>
          </p>
          <p>📞 Phone: +0000 000 000</p>
          <p>📍 Address: 123 Care St., Kathmandu, Nepal</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
