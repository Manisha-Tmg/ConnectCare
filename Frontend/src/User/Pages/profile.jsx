import { useEffect, useState } from "react";
import "../css/setting.css";
import Header from "../components/Header";

import { API } from "../../env";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const id = Cookies.get("user_id");

  useEffect(() => {
    async function fetchProfile() {
      const token = Cookies.get("accessToken");
      const id = Cookies.get("user_id");

      if (!token || !id) {
        console.error("Missing authentication details");
        return;
      }

      try {
        const res = await fetch(`${API}api/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const result = await res.json();
        setData(result);
        // Cookies.set("profile_picture_url");
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }

    fetchProfile();
  }, []);

  if (!data) {
    return (
      <div>
        <Header />
        {/* <Sidebar /> */}
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="profile-container-main">
        <div className="p-container">
          <div className="p-card">
            {" "}
            <button
              className="edit-button"
              onClick={() => navigate(`/profile-edit/${id}`)}
            >
              Edit
            </button>
            <div className="p-header">
              <img
                src={data.profile_picture_url}
                alt="Profile"
                className="p-pic"
              />
              <h2>{data.name}</h2>
            </div>
            <div className="p-section">
              <h3>Personal Information</h3>
              <div className="p-info">
                <strong>Gender:</strong> {data.gender}
              </div>
              <div className="p-info">
                <strong>Email:</strong> {data.email}
              </div>
              {/* <div className="p-info">
                <strong>Phone:</strong> {data.phone}
              </div>
              <div className="p-info">
                <strong>Address:</strong> {data.address}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
