import React from "react";
import "../css/Changepassword.css";
import Sidebaruser from "../components/Sidebaruser";

const Changepassword = () => {
  return (
    <div>
      <Sidebaruser />
      <div className="main-content">
        <h1>Change Password</h1>
        <form>
          <div>
            <label>Password</label>
            <input type="password" placeholder="Enter current password" />
          </div>
          <div>
            <label>New Password</label>
            <input type="password" placeholder="Enter new password" />
          </div>
          <div>
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm new password" />
          </div>
          <p>
            Passwords must be 8-20 characters with at least 1 number, 1 letter,
            and 1 special symbol.
          </p>
          <button type="submit">Confirm</button>
        </form>
      </div>
    </div>
  );
};

export default Changepassword;
