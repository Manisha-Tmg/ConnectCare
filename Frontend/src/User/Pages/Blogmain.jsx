import React from "react";
import "../css/Blog.css";
import Caregibving from "../../assets/Caregibving.jpg";
import elderlycare from "../../assets/elderlycare.jpg";
import homehealth from "../../assets/home health.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Previous from "../components/Previous";

const Blogmain = () => {
  const navigate = useNavigate();

  const posts = [
    {
      id: 1,
      title: "The Importance of Caregiving Services",
      excerpt:
        "Discover why professional caregiving is essential for individuals in need with disabilities.",
      content: `Caregiving services play a crucial role in supporting individuals with disabilities, seniors, and those with chronic illnesses. 
      Professional caregivers provide assistance with daily activities, medical needs, and emotional support. 
      They help improve the quality of life for patients by offering companionship, ensuring medication adherence, and providing 
      specialized care tailored to individual needs. As the demand for home-based care increases, the importance of well-trained caregivers 
      cannot be overstated.`,
      image: Caregibving,
      date: "Feb 7, 2025",
    },
    {
      id: 2,
      title: "How to Choose the Right Caregiver?",
      excerpt:
        "A guide to selecting the best caregiving services for your loved one in need with disabilities.",
      content: `Choosing the right caregiver requires careful consideration of experience, qualifications, and personality. 
      Start by identifying the specific needs of your loved one—whether they require medical assistance, companionship, or personal care. 
      Interview multiple caregivers, check their references, and ensure they have the necessary certifications. 
      Communication and trust are key to a successful caregiver-patient relationship.`,
      image: homehealth,
      date: "Jan 28, 2025",
    },
    {
      id: 3,
      title: "Top Benefits of Home Care Services",
      excerpt:
        "Explore the advantages of home care services for seniors and individuals with disabilities.",
      content: `Home care services offer a personalized approach to healthcare, allowing individuals to receive medical 
      and personal care in the comfort of their own homes. Benefits include increased independence, cost-effectiveness compared to 
      nursing homes, emotional support from familiar surroundings, and customized care plans tailored to specific needs. 
      These services not only enhance the quality of life but also reduce hospital readmissions.`,
      image: elderlycare,
      date: "Jan 15, 2025",
    },
  ];

  return (
    <div>
      <Header />
      <div className="blog-container">
        <div className="blog-header">
          <h1>Blog</h1>
          <p>Insights and updates on caregiving and wellness.</p>
        </div>

        <div className="blog-grid">
          {posts.map((post) => (
            <div key={post.id} className="blog-card">
              <img src={post.image} alt={post.title} className="blog-image" />
              <div className="blog-content">
                <h2>{post.title}</h2>
                <p className="blog-date">{post.date}</p>
                <p className="blog-excerpt">{post.excerpt}</p>
                <button
                  className="blog-button"
                  onClick={() => navigate(`/blog/${post.id}`, { state: post })}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blogmain;
