import React from "react";

const Conormation = () => {
  return (
    <div>
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-logo">
            <img src="/api/placeholder/100/40" alt="Logo" />
          </div>
          <div className="confirm-icon">✓</div>
          <h1 className="auth-title">Check Your Email</h1>
          <p className="auth-description">
            We've sent a password reset link to:
            <br />
            <strong>{email}</strong>
          </p>
          <p className="sub-description">
            If you don't see it in your inbox, please check your spam folder.
          </p>
          <div className="auth-links">
            <a href="/login" className="link">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conormation;
