import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Contact from "./Contact";
import HomePage from "./Home";
import "../css/AboutUs.css";

const Home = () => {
  return (
    <div className="main-div">
      <Header />
      <HomePage />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
