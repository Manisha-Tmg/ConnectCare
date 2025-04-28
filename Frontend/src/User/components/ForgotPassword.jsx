import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import "./css/ForgotPassword.css";
import { API } from "../../env";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const tokenn = Cookies.get("csrftoken");

    if (!email) {
      return setError("Please enter your email address");
    }
    try {
      setLoading(true);
      const response = await fetch(`${API}password-reset/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (data.success) {
        setSuccess(
          data.message || "Email sent successfully, please check your inbox"
        );
      } else {
        setError(data.message || "Something went wrong, Try again !");
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h1 className="forgot-title">Forgot Password</h1>
        <p className="forgot-subtitle">
          Enter your email address and we'll send you an email to reset your
          password.
        </p>
        {error && <p className="forgot-error">{error}</p>}
        {success && <p className="forgot-success">{success}</p>}

        <form className="forgot-form" onSubmit={handleSubmit}>
          <div className="forgot-form-group">
            <label htmlFor="email" className="forgot-label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="forgot-input"
            />
          </div>
          <button type="submit" className="forgot-button">
            {loading ? (
              <p className="forgot-button-text">Verifying...</p>
            ) : (
              <p className="forgot-button-text">Verify Email</p>
            )}
          </button>
        </form>
        <div className="forgot-back-login">
          <div onClick={() => navigate("/login")} className="forgot-login-link">
            Back to Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
