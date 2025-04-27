import { useState } from "react";
import "../css/forgotpassword.css";
import Forgot from "../../assets/Forgot password-amico.png";
import Conormation from "../components/Conormation";

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
  return <Conormation />;
}

export default Forgotpassword;
