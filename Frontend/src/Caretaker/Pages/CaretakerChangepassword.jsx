import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { API } from "../../env";
import "../../User/css/ChangePassword.css";

const CaretakerChangepassword = () => {
  const [old_password, setOldPassword] = useState("");
  const [new_Password, setNewPassword] = useState("");
  const [confirm_Password, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function passwordChange(e) {
    e.preventDefault();

    const token = Cookies.get("accessToken");

    if (!token) {
      toast.error("Please login! Your token has expired");
      Cookies.remove("accessToken");
      Cookies.remove("role");
      Cookies.remove("caretaker_id");
      navigate("/login");
    }

    if (new_Password !== confirm_Password) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const res = await fetch(`${API}api/changepassword/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: old_password,
          new_password: new_Password,
          confirm_password: confirm_Password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password changed successfully");
        Cookies.remove("AccessToken");
        navigate("/login");
      } else {
        toast.error(data.detail || "Error changing password");
      }
    } catch (error) {
      toast.error("Server error, please try again");
    }
  }
  return (
    <div>
      <CaretakerSidebar />
      <div className="change-password-container">
        <h2>Change Password</h2>
        <form onSubmit={passwordChange}>
          <label>Current Password</label>
          <input
            type="password"
            value={old_password}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />

          <label>New Password</label>
          <input
            type="password"
            value={new_Password}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirm_Password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default CaretakerChangepassword;
