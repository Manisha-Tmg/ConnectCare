import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import "../css/Backbtn.css";
import { useNavigate } from "react-router-dom";

const Backbtn = () => {
  const navigate = useNavigate();
  return (
    <div>
      <span onClick={() => navigate(-1)} className="back-button">
        <IoIosArrowBack className="icon-back" /> Back
      </span>
    </div>
  );
};

export default Backbtn;
