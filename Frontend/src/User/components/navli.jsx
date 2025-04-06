import React from "react";
import { Link } from "react-router-dom";

const Li = () => {
  return (
    <div>
      <nav className="caretaker-nav">
        <ul>
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/caretaker" className="nav-link">
              Find Caretaker
            </Link>
          </li>
          <li>
            <Link to="/aboutus" className="nav-link">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/blog" className="nav-link">
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Li;
