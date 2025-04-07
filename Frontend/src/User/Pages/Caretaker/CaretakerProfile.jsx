import { useEffect, useState } from "react";
import "../../css/profile.css";
import Cookies from "js-cookie";
import { API } from "../../../env";
import CaretakerSidebar from "../../components/side";

const CaretakerProfile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCaretakerProfile() {
      const Token = Cookies.get("accessToken");
      const id = Cookies.get("caretaker_id");

      if (!Token || !id) {
        console.error("Missing authentication details");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API}api/caretakers/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCaretakerProfile();
  }, []);

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!data) {
    return (
      <div className="error">Error loading profile. Please try again.</div>
    );
  }

  return (
    <div className="profile-page">
      <CaretakerSidebar />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <img
              src={data.profile_picture_url}
              alt="Profile"
              className="profile-pic"
            />
            <h2>{data.name}</h2>
            <p className="bio">{data.bio}</p>
          </div>

          <div className="profile-section">
            <h3>Personal Information</h3>
            <div className="profile-info">
              <strong>Gender:</strong> {data.gender}
            </div>
            <div className="profile-info">
              <strong>Email:</strong> {data.email}
            </div>
            <div className="profile-info">
              <strong>Phone:</strong> {data.phone}
            </div>
            <div className="profile-info">
              <strong>Address:</strong> {data.address}
            </div>
          </div>

          <div className="profile-section">
            <h3>Professional Details</h3>
            <div className="profile-info">
              <strong>Specialty:</strong> {data.specialty}
            </div>
            <div className="profile-info">
              <strong>Experience:</strong> {data.experience} years
            </div>
            <div className="profile-info">
              <strong>Previous Experience:</strong> {data.previous_experience}
            </div>
            <div className="profile-info">
              <strong>Hourly Rate:</strong> ${data.hourly_rate}/hr
            </div>
            <div className="profile-info">
              <strong>Languages Spoken:</strong> {data.languages_spoken}
            </div>
          </div>

          <div className="profile-section">
            <h3>Documents</h3>
            <a
              href={data.gov_id_url}
              target="_blank"
              rel="noopener noreferrer"
              className="doc-link"
            >
              Government ID
            </a>
            <a
              href={data.certification_docs_url}
              target="_blank"
              rel="noopener noreferrer"
              className="doc-link"
            >
              Certification Documents
            </a>
            <a
              href={data.police_clearance_url}
              target="_blank"
              rel="noopener noreferrer"
              className="doc-link"
            >
              Police Clearance
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaretakerProfile;
