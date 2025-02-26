import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/BlogDetails.css";
import Backbtn from "../components/Backbtn";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BlogDetail = () => {
  const location = useLocation();
  const post = location.state;

  return (
    <div>
      <Header />
      <div className="blog-detail-container">
        <Backbtn />
        <h1 className="blog-detail-title">{post.title}</h1>
        <p className="blog-detail-date">{post.date}</p>
        <img src={post.image} alt={post.title} className="blog-detail-image" />
        <p className="blog-detail-content">{post.content}</p>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetail;
