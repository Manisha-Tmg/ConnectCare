import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../env";
import Cookies from "js-cookie";
import InputField from "../../User/components/Input";
import Footer from "../../User/components/Footer";
import "../css/edit-profile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const id = Cookies.get("user_id");
        const token = Cookies.get("accessToken");

        if (!caretakerId || !token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${API}edit-profile/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setProfileData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          bio: data.bio || "",
        });

        if (data.avatar) {
          setPreviewUrl(data.avatar);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const caretakerId = Cookies.get("caretaker_id");
      const token = Cookies.get("accessToken");

      const formData = new FormData();
      for (const key in profileData) {
        formData.append(key, profileData[key]);
      }

      if (avatar) {
        formData.append("avatar", avatar);
      }

      const response = await fetch(
        `${API}api/caretaker/${caretakerId}/update`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      alert("Profile updated successfully!");
      // Optionally redirect or refresh data
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        <h2>Edit Profile</h2>
        <p>Update your personal information</p>

        <div className="avatar-section">
          <div className="avatar-preview">
            {previewUrl ? (
              <img src={previewUrl} alt="Profile" />
            ) : (
              <div className="avatar-placeholder">
                {profileData.name
                  ? profileData.name.charAt(0).toUpperCase()
                  : "U"}
              </div>
            )}
          </div>
          <div className="avatar-upload">
            <label htmlFor="avatar-input" className="upload-btn">
              Change Photo
            </label>
            <input
              type="file"
              id="avatar-input"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <InputField
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              placeholder="Your full name"
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <InputField
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              placeholder="Your email address"
              disabled
            />
            <span className="field-hint">Email cannot be changed</span>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <InputField
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              placeholder="Your phone number"
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <InputField
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
              placeholder="Your address"
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              placeholder="Tell us about yourself"
              rows="4"
            />
          </div>

          <div className="action-buttons">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
