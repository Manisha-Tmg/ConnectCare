import React, { useState } from "react";
import "../css/login.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { API } from "../../env";
import InputField from "../components/Input";
import Footer from "../components/Footer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}auth/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log("API Response:", data);

      if (data.access_token) {
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("role", data.role); // Default to "user" if role is missing

        // Retrieve role from localStorage before navigating
        const userRole = localStorage.getItem("role");
        console.log(userRole);
        // Navigate based on role
        if (userRole === "user") {
          navigate("/");
        } else if (userRole === "caretaker") {
          navigate("/dashboard");
        } else if (userRole === "admin") {
          navigate("/admin-panel");
        } else {
          navigate("/dashboard");
        }
      } else {
        console.log("Login failed:", data.error || "Invalid credentials");
        alert(data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="auth-container">
        <div className="auth-box">
          <h2>Welcome Back</h2>
          <p>Please log in to your account</p>
          <InputField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter your username"
          />
          <InputField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
          />
          <Link to="/forgot-password" className="forgot-link">
            Forgot password?
          </Link>
          <button className="auth-button" onClick={handleLogin}>
            Log In
          </button>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="create-account">
              Create an account
            </Link>
          </p>
        </div>
        <div className="auth-image login-image"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
