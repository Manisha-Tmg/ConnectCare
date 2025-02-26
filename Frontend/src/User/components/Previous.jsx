import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import "../css/Backbtn.css";
import { useNavigate } from "react-router-dom";

const Previous = () => {
  const navigate = useNavigate();
  return (
    <div>
      <span onClick={() => navigate(-1)} className="back-button1">
        <IoIosArrowBack className="icon-back" />
      </span>
    </div>
  );
};

export default Previous;
