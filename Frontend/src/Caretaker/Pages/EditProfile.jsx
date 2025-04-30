import { useEffect, useState } from "react";
import "../css/edit-profile.css";
import Cookies from "js-cookie";
import { API } from "../../env";
import CaretakerSidebar from "../Components/side";
import { useNavigate, useParams } from "react-router-dom";

const EditCaretakerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    specialty: "",
    experience: "",
    hourly_rate: "",
    languages_spoken: "",
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [govId, setGovId] = useState(null);
  const [policeClearance, setPoliceClearance] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API}api/caretakers/${id}`);
        const data = await res.json();
        setFormData({
          name: data.name || "",
          bio: data.bio || "",
          gender: data.gender || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          specialty: data.specialty || "",
          experience: data.experience || "",
          hourly_rate: data.hourly_rate || "",
          languages_spoken: data.languages_spoken || "",
        });
      } catch (err) {
        console.error("Error fetching caretaker:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("accessToken");
      const formDataToSend = new FormData();

      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append file data only if selected
      if (profilePicture)
        formDataToSend.append("profile_picture", profilePicture);
      if (govId) formDataToSend.append("gov_id", govId);
      if (policeClearance)
        formDataToSend.append("police_clearance", policeClearance);

      const res = await fetch(`${API}profile-edit/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!res.ok) throw new Error("Failed to update profile");

      navigate(`/caretaker/profile`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-page">
      <CaretakerSidebar />
      <form className="profile-form modern-form" onSubmit={handleSubmit}>
        <h2>Edit Caretaker Profile</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            rows="3"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            disabled
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Specialty</label>
          <input
            type="text"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Experience (years)</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Hourly Rate ($)</label>
          <input
            type="number"
            name="hourly_rate"
            value={formData.hourly_rate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Languages Spoken</label>
          <input
            type="text"
            name="languages_spoken"
            value={formData.languages_spoken}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            name="profile_picture"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Gov ID</label>
          <input
            type="file"
            accept="image/*"
            name="gov_id"
            onChange={(e) => setGovId(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Police Clearance ID</label>
          <input
            type="file"
            accept="image/*"
            name="police_clearance"
            onChange={(e) => setPoliceClearance(e.target.files[0])}
          />
        </div>

        <button type="submit" className="modern-save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditCaretakerProfile;
