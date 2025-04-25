import { useState } from "react";
import "../css/forgotpassword.css";
import Forgot from "../../assets/Forgot password-amico.png";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return <ForgotPasswordConfirmation email={email} />;
  }

  return (
    <div className="auth-container">
      <div className="auth-logo">
        <img src={Forgot} alt="Logo" />
      </div>
      <div className="auth-card">
        <h1 className="auth-title">Forgot Password</h1>
        <p className="auth-description">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Reset Password"}
          </button>
        </form>
        <div className="auth-links">
          <a href="/login" className="link">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

// Confirmation Screen
function ForgotPasswordConfirmation({ email }) {
  return (
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
  );
}

export default Forgotpassword;
