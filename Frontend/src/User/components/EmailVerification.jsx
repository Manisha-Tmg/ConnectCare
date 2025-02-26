import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/emailverification.css";
import { API } from "../../env";

const EmailVerification = () => {
  const { uid, token } = useParams();
  const [status, setStatus] = useState("Verifying your email...");
  const [statusType, setStatusType] = useState("loading"); // loading, success, error
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`${API}verify-email/${uid}/${token}/`);

        if (!response.ok) {
          throw new Error("Failed to verify email");
        }

        const data = await response.json();

        if (data.message) {
          setStatusType("success");
          setStatus("✅ Email verified successfully! Redirecting to login...");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setStatusType("error");
          setStatus("❌ Invalid or expired verification link.");
        }
      } catch (error) {
        setStatusType("error");
        setStatus("⚠️ An error occurred. Please try again.");
      }
    };

    verifyEmail();
  }, [uid, token, navigate]);

  return (
    <div className={`verification-container ${statusType}`}>
      <div className="card">
        <h2>Email Verification</h2>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default EmailVerification;
