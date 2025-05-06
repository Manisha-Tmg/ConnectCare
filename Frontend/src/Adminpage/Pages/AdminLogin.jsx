import React, { useState } from "react";
import "../Css/login.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { API } from "../../env";
import InputField from "../../User/components/Input";
import Header from "../../User/components/Header";
import Footer from "../../User/components/Footer";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}auth/api/login/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("API Response:", data);

      if (data.access_token) {
        Cookies.set("accessToken", data.access_token);
        Cookies.set("csrf", data.csrf_token);
        Cookies.set("username", data.username);
        Cookies.set("role", data.role || "admin");

        // Navigate based on user role
        const userRole = Cookies.get("role");
        console.log("User Role:", userRole);

        if (userRole === "user") {
          navigate("/");
        } else if (userRole === "caretaker") {
          navigate("/dashboard");
        } else if (userRole === "admin") {
          navigate("/admin/dashboard/");
        }
      } else {
        console.log("Login failed:", data.error || "Invalid credentials");
        toast.error(data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="admin-auth-container">
        <div className="admin-auth-box">
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
          {/* <Link to="/forgot-password" className="forgot-link">
            Forgot password? */}
          {/* </Link> */}
          <button className="admin-auth-button" onClick={handleLogin}>
            Log In
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLogin;
