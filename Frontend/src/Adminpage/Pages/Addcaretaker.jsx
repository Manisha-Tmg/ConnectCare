import { useState } from "react";
import "../../Adminpage/Css/Addcaretaker.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API } from "../../env";
import Sidebar from "../components/AdminSidebar";

const Addcaretaker = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [hourly_rate, setHourlyRate] = useState("");
  const [languages_spoken, setLanguagesSpoken] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profile_picture_url, setProfilePicture] = useState("");
  const [gov_id_url, setGovId] = useState("");
  const [certification_docs_url, setCertDocs] = useState("");
  const [police_clearance_url, , setPoliceClearance] = useState("");
  const navigate = useNavigate();

  const formData = {
    name: name,
    gender: gender,
    profile_picture: profile_picture_url,
    certificate: certification_docs_url,
    govId: gov_id_url,
    email: email,
    phone: phone,
    address: address,
    experience: experience,
    specialty: specialty,
    hourly_rate: hourly_rate,
    languages_spoken: languages_spoken,
    bio: bio,
    username: username,
    password: password,
    police_clearance: police_clearance_url,
  };

  async function hanldeCaretaker() {
    e.preventDefault();
    try {
      const res = await fetch(`${API}caretakers/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify({ formData }),
      });

      const data = await res.json();

      if (data.ok) {
        toast.success("Caretaker Registration was successful");
        navigate("/dashboard");
      } else {
        toast.error("Error creatinng the caretaker");
      }
    } catch (error) {
      toast.error(error);
    }
  }
  return (
    <div>
      <Sidebar />
      <div className="form-container">
        <h2>Caretaker Registration</h2>
        <p className="form-subtitle">
          Fill out the form carefully for registration
        </p>
        <form>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Gender:</label>
              <select
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Please Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                name="email"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                maxLength="10"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <textarea
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Experience (Years):</label>
              <input
                type="number"
                name="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Specialty:</label>
              <select
                name="specialty"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              >
                <option value="">Please Select</option>
                <option value="Elder Care">Elder Care</option>
                <option value="Medication Management">
                  Medication Management
                </option>
                <option value="Physical Therapy">Physical Therapy</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Hourly Rate:</label>
            <input
              type="number"
              name="hourly_rate"
              value={hourly_rate}
              onChange={(e) => setHourlyRate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Languages Spoken:</label>
            <input
              type="text"
              name="languages_spoken"
              value={languages_spoken}
              onChange={(e) => setLanguagesSpoken(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Bio:</label>
            <textarea
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Profile Picture URL:</label>
            <input
              type="url"
              name="profile_picture"
              value={profile_picture_url}
              onChange={(e) => setProfilePicture(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Gov ID URL:</label>
            <input
              type="url"
              name="gov_id"
              value={gov_id_url}
              onChange={(e) => setGovId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Certification Docs URL:</label>
            <input
              type="url"
              name="certification_docs"
              value={certification_docs_url}
              onChange={(e) => setCertDocs(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Police Clearance URL:</label>
            <input
              type="url"
              name="police_clearance"
              value={police_clearance_url}
              onChange={(e) => setPoliceClearance(e.target.value)}
              required
            />
          </div>{" "}
          <div className="form-row">
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" onClick={hanldeCaretaker}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcaretaker;
