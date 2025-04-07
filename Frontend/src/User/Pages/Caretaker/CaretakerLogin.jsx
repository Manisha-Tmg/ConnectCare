import React, { useState } from "react";
import "../../css/login.css";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../../env";
import InputField from "../../components/Input";
import Footer from "../../components/Footer";
import Cookies from "js-cookie";

const CaretakerLogin = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}auth/api/login/caretaker`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("API Response:", data);

      if (data.access_token) {
        Cookies.set("accessToken", data.access_token, {
          expires: 7,
          secure: true,
        });
        Cookies.set("caretaker_id", data.caretaker_id, {
          expires: 7,
          secure: true,
        });
        Cookies.set("role", data.role || "caretaker", {
          expires: 7,
          secure: true,
        });

        // Navigate based on user role
        const userRole = Cookies.get("role");
        console.log("User Role:", userRole);

        if (userRole === "user") {
          navigate("/");
        } else if (userRole === "caretaker") {
          navigate("/dashboard");
        } else if (userRole === "admin") {
          navigate("/admin-panel");
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
      {/* <Header /> */}
      <div className="auth-container">
        <div className="auth-box">
          <h2>Welcome Back</h2>
          <p>Please log in to your account</p>
          <InputField
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="text"
            placeholder="Enter your email"
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
        </div>
        <div className="auth-img login-imagee"></div>
      </div>
      <Footer />
    </div>
  );
};

export default CaretakerLogin;
