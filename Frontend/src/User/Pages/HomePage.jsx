import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Contact from "./Contact";
import HomePage from "./Home";
import Blog from "./Blog";
import "../css/AboutUs.css";

const Home = () => {
  return (
    <div className="main-div">
      <Header />
      <HomePage />
      {/* <Blog /> */}
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
