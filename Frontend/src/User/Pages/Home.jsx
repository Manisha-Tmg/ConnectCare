import React from "react";
import "../css/Body.css";
import Body from "./Body";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HomePage = () => {
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
            <Link to={"/bookcaretaker"}>
              <button className="get-started">Find a Caretaker</button>
            </Link>
          </div>
        </div>
      </section>
      <Body />
    </div>
  );
};

export default HomePage;
