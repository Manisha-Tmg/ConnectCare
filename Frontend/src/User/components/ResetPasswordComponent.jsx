import React, { useEffect, useState } from "react";
import "./css/ResetPassword.css";
import { API } from "../../env";

const ResetPasswordComponent = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      return setError("Please fill all the fields");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    try {
      setLoading(true);
      const response = await fetch(`${API}reset-password/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(data.message || "Password changed successfully");
        setPassword("");
        setConfirmPassword("");
      } else if (data.success === false) {
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

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const t = searchParams.get("t");
    if (t) {
      setToken(t);
    } else {
      setError("Invalid token");
    }
  }, []);

  return (
    <div className="reset-container">
      <div className="reset-wrapper">
        <h1 className="reset-title">Change Password</h1>
        <p className="reset-subtitle">
          Enter your new password below to reset your account.
        </p>
        {error && <p className="reset-message reset-error">{error}</p>}
        {success && <p className="reset-message reset-success">{success}</p>}

        <form className="reset-form" onSubmit={handleSubmit}>
          <div className="reset-form-group">
            <label htmlFor="newPassword" className="reset-label">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="reset-input"
            />
          </div>

          <div className="reset-form-group">
            <label htmlFor="confirmPassword" className="reset-label">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="reset-input"
            />
          </div>

          <button type="submit" className="reset-button">
            {loading ? "Changing Password..." : "Change Password"}
          </button>
        </form>

        <div className="reset-login-link">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordComponent;
