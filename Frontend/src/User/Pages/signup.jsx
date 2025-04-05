import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/signup.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { API } from "../../env";
import InputField from "../components/Input";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [username, seUserName] = useState("");
  const [profile_picture_url, setProfilePicture] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("gender", gender);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("profile_picture", profile_picture_url);

    e.preventDefault();
    try {
      const res = await fetch(`${API}api/register/`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/login");
      } else {
        toast.error(`Error: ${data.message || "User registration failed."}`);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };
  return (
    <div>
      <Header />
      <div className="user-form-container">
        <h2>User Registration</h2>
        <p className="user-form-subtitle">
          Fill out the form carefully for registration
        </p>
        <form>
          <div className="user-form-group">
            <label>Name:</label>
            <input
              type="text"
              className="user-select"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="user-form-row">
            <div className="user-form-group">
              <label>Gender:</label>
              <select
                name="gender"
                className="user-select"
                value={gender}
                required
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Please Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option> required
              </select>
            </div>

            <div className="user-form-group">
              <label>Phone:</label>
              <input
                className="user-select"
                type="text"
                name="email"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                maxLength="10"
              />
            </div>
          </div>
          <div className="user-form-group">
            <label>Email:</label>
            <input
              type="email"
              className="user-select"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="user-form-group">
            <label>Address:</label>
            <input
              name="address"
              required
              className="user-select"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label>Profile Picture URL:</label>
            <input
              type="file"
              accept="image/*"
              className="user-select"
              name="profile_picture"
              required
              onChange={(e) => setProfilePicture(e.target.files[0])}
            />
          </div>
          <div className="user-form-row">
            <div className="user-form-group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                className="user-select"
                value={username}
                onChange={(e) => seUserName(e.target.value)}
                required
              />
            </div>
            <div className="user-form-group">
              <label>Password:</label>
              <input
                type="password"
                className="user-select"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button className="user-auth-button-signup" onClick={handleSignup}>
            Sign Up
          </button>
          <p className="account">
            Already have an account?
            <Link to="/login" className="login">
              Log In
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
