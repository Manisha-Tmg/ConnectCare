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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          first_name,
          last_name,
          username,
          password,
        }),
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
      <div className="auth-container-signup">
        <div className="auth-box-signup">
          <h2>Create an Account</h2>
          <InputField
            value={username}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Username"
          />
          <InputField
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <InputField
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <InputField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <InputField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className="auth-button-signup" onClick={handleSignup}>
            Sign Up
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="login">
              Log In
            </Link>
          </p>
        </div>
        <div className="auth-images signup-image"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
