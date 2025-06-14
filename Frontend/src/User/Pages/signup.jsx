import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/signup.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { API } from "../../env";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !gender ||
      !email ||
      !username ||
      !password ||
      !profilePictureFile
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (username.includes(" ")) {
      toast.error("Space not allowed");
      return;
    }
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      toast.error(
        "Username can only contain letters, numbers, and underscores."
      );
      return;
    }

    if (email.includes(" ")) {
      toast.error("Space not allowed in password");
      return;
    }

    if (password.includes(" ")) {
      toast.error("Space not allowed in password");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("gender", gender);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("profile_picture", profilePictureFile);

    try {
      const res = await fetch(`${API}api/register/`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error(`Error: ${data.message || "User registration failed."}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="users-form-container">
        <h2>User Registration</h2>
        <p className="users-form-subtitle">
          Fill out the form carefully for registration
        </p>
        <form onSubmit={handleSignup}>
          <div className="users-form-row">
            <div className="users-form-group">
              <label>Name:</label>
              <input
                type="text"
                className="users-select1"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="users-form-group">
              <label>Profile Picture:</label>
              <input
                type="file"
                accept="image/*"
                className="users-select2"
                name="profile_picture"
                required
                onChange={(e) => setProfilePictureFile(e.target.files[0])}
              />
            </div>
          </div>
          <div className="users-form-row">
            <div className="users-form-group">
              <label>Gender:</label>
              <select
                name="gender"
                className="users-select3"
                value={gender}
                required
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Please Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="users-form-group">
              <label>Phone:</label>
              <input
                className="users-select"
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                maxLength="10"
              />
            </div>
            <div className="users-form-group">
              <label>Email:</label>
              <input
                type="email"
                className="users-select4"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="users-form-group">
            <label>Address:</label>
            <input
              name="address"
              required
              className="users-select"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="users-form-row">
            <div className="users-form-group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                className="users-select5"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="users-form-group">
              <label>Password:</label>
              <input
                type="password"
                className="users-select6"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="users-auth-button-signup">
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
