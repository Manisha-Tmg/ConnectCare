import React from "react";
import "../css/AboutUs.css";
import photo from "../../assets/Profile.jpg";
import Maria from "../../assets/julia.jpg";
import joordan from "../../assets/joordan.jpg";

const Blog = () => {
  return (
    <div className="testimonial-wrapper">
      <section className="about-us-testimonials">
        <h2 className="testimonial-title">What Our Families Say ❤️</h2>
        <p className="testimonial-subtitle">
          Real stories from people who trust <strong>ConnectCare</strong>!
        </p>
        <div className="testimonials-carousel">
          <div className="testimonial-item">
            <img src={photo} alt="Sophia" className="testimonial-image" />
            <p className="testimonial-text">
              "It's nice that Sophia does the things with Nora and Felicia that
              I can't find the time for."
            </p>
            <p className="testimonial-author">- Sophia</p>
          </div>
          <div className="testimonial-item">
            <img src={Maria} alt="Maria" className="testimonial-image" />
            <p className="testimonial-text">
              "Maria has been an amazing help, providing so much support when
              needed."
            </p>
            <p className="testimonial-author">- Maria</p>
          </div>
          <div className="testimonial-item">
            <img src={joordan} alt="Jorden" className="testimonial-image" />
            <p className="testimonial-text">
              "Finding a Caretaker like Jessica has been a game-changer for our
              family."
            </p>
            <p className="testimonial-author">- Jorden</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
