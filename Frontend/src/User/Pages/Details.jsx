import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/Details.css";
import Cookies from "js-cookie";

import Header from "../components/Header";
import { API } from "../../env";

import { MdEmail, MdLanguage } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoDocumentAttachSharp } from "react-icons/io5";

import { MdVerified } from "react-icons/md";
import { ImCross } from "react-icons/im";
import toast from "react-hot-toast";

const Details = () => {
  const { id } = useParams();
  const [caretaker, setCaretaker] = useState(null);
  const navigate = useNavigate();

  const bookLogin = () => {
    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("Please Login First");
      // toast.error("Please login First")
      // navigate("/login");
    } else {
      navigate(`/BookCaretaker/${id}`);
    }
  };

  useEffect(() => {
    const fetchCaretaker = async () => {
      try {
        const res = await fetch(`${API}api/caretakers/${id}`);
        const data = await res.json();
        setCaretaker(data);
        // const name = Cookies.set("name");
        // console.log(name);
      } catch (error) {
        console.error("Error fetching caretaker data", error);
      }
    };
    fetchCaretaker();
  }, [id]);

  if (!caretaker) return <p>Loading...</p>;

  return (
    <div>
      <Header />
      <div className="Details-caretaker-container">
        {/* Left Side - Profile Info */}
        <div className="Details-caretaker-profile">
          <img
            src={caretaker.profile_picture_url}
            alt={caretaker.name}
            className="Details-profile-img"
          />
          <h1 className="Details-caretaker-name">
            {caretaker.name}
            {caretaker.is_approved ? (
              <MdVerified className="Details-verified-icon" />
            ) : (
              <ImCross className="Details-verified-icon" />
            )}
          </h1>
          <p className="Details-joined-date">
            Joined {new Date(caretaker.created_at).toISOString().split("T")[0]}
          </p>
          <p className="Details-joined-date">
            <strong>Hourly Rate:</strong> ${caretaker.hourly_rate}
          </p>
          <p className="Details-joined-date"></p>
          <hr />
          <h2 className="Details-section-title">About {caretaker.name}</h2>
          <p>
            <strong>Experience:</strong> {caretaker.experience} years ,
            {caretaker.previous_experience}
          </p>

          <p>
            <strong>Gender:</strong> {caretaker.gender}
          </p>
          <p>
            <strong>
              Specialty:
              <strong className="specialtyyy"> {caretaker.specialty}</strong>
            </strong>
          </p>
          <p className="Details-about-text">{caretaker.bio}</p>
        </div>

        {/* Right Side - Booking & Details */}
        <div className="Details-caretaker-sidebar">
          {/* <Link to={`/BookCaretaker/${id}`}> */}
          <button className="Details-book-button" onClick={bookLogin}>
            Create a new booking
          </button>
          {/* </Link> */}
          <div className="Details-info-card">
            <h3>Available Areas</h3>
            <p>
              <FaMapMarkerAlt /> {caretaker.address}
            </p>
          </div>
          {/* <div className="Details-info-card">
            <h3>Working Days:</h3>
            <p>
              <FaRegCalendarDays />
              {caretaker.working_days}
            </p>
          </div> */}

          <div className="Details-info-card">
            <h3>Language</h3>
            <p>
              <MdLanguage />
              {caretaker.languages_spoken
                ? caretaker.languages_spoken.split(",").map((lang, index) => (
                    <span key={index}>
                      {/* to separate the strings given by the user */}
                      {lang.trim()}
                    </span>
                  ))
                : "Not specified"}
            </p>
          </div>

          <div className="Details-info-card">
            <h3>For more information</h3>
            <p>
              <MdEmail /> {caretaker.email}
            </p>
            <p>
              <FaPhone /> {caretaker.phone}
            </p>
          </div>
          <div className="Details-info-card">
            <h3>Documents</h3>
            <a href={caretaker.gov_id_url} className="doc">
              <IoDocumentAttachSharp />
              Government ID
            </a>
            {/* <a href={caretaker.certification_docs_url} className="doc">
              <IoDocumentAttachSharp />
              Certification Documents
            </a> */}
            <a href={caretaker.police_clearance_url} className="doc">
              <IoDocumentAttachSharp />
              Police Clearance
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
