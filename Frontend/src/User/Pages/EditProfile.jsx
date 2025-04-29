import { useEffect, useState } from "react";
import "../css/edit-profile.css";
import Header from "../components/Header";

import { API } from "../../env";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",

    username: "",
    profile_picture: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("accessToken");
        const res = await fetch(`${API}api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };

    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get("accessToken");
    const payload = new FormData();

    for (const key in formData) {
      payload.append(key, formData[key]);
    }

    try {
      const res = await fetch(`${API}edit-profile/${id}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      if (!res.ok) throw new Error("Failed to update");

      alert("Profile updated successfully!");
      navigate(`/profile`);
    } catch (err) {
      console.error("Update failed", err);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <Header />
      <div className="edit-profile-container">
        <form className="edit-form" onSubmit={handleSubmit}>
          <h2>Edit Profile</h2>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />
          {/* 
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled
          /> */}
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            disabled
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {/* 
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          /> */}
          <label>Profile Picture:</label>
          <input
            type="file"
            name="profile_picture"
            onChange={handleChange}
            accept="image/*"
          />
          <div className="div-btn">
            <button className="btn11" type="submit">
              Cancel
            </button>
            <button className="btn12" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
