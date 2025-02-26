import React from "react";
import "../css/Users.css";
import photo from "../../assets/Profile.jpg";

const testimonials = [
  {
    text: "It's nice that Sophia does the things with Nora and Felicia that I can't find the time for.",
    author: "Sophia",
    image: photo,
  },
  {
    text: "Maria has been an amazing help, providing so much support when needed.",
    author: "Maria",
    image: photo,
  },
  {
    text: "Finding a Caretaker like Jessica has been a game-changer for our family.",
    author: "Jorden",
    image: photo,
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>Families Using Connect Care</h2>
      <p>Find out about their experience with Caretakers !</p>
      <div className="testimonial-cards">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <img src={testimonial.image} alt={testimonial.author} />
            <p>"{testimonial.text}"</p>
            <span>- {testimonial.author}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
