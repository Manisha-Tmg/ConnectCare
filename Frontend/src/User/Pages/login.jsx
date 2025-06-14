import React, { useState } from "react";
import "../css/login.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { API } from "../../env";
import InputField from "../components/Input";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.access_token) {
        toast.success("Login Successful");
        Cookies.set("accessToken", data.access_token, {
          expires: 300,
          secure: true,
        });
        Cookies.set("user_id", data.user_id);
        Cookies.set("role", data.role);
        Cookies.set("username", data.username);

        // Navigate based on user role
        const userRole = Cookies.get("role");

        if (userRole === "user") {
          navigate("/");
        } else if (userRole === "caretaker") {
          navigate("/dashboard");
        } else if (userRole === "admin") {
          navigate("/admin-panel");
        }
      } else {
        toast.error(data.error || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="user-auth-container">
        <div className="user-auth-box">
          <h2>Welcome Back</h2>
          <p>Please log in to your account</p>
          <InputField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button className="user-auth-button" onClick={handleLogin}>
            Log In
          </button>
          <p>
            Don't have an account?
            <Link to="/signup" className="create-account">
              Create an account
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
