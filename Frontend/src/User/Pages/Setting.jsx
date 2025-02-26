import { useState } from "react";
import "../css/Settings.css";
import { User, Lock, Calendar } from "lucide-react";
import Sidebaruser from "../components/Sidebaruser";
import Header from "../components/Header";

const Setting = () => {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div>
      {/* <Header /> */}
      <div>
        <Sidebaruser />
        <div className="settings-content">
          {activeSection === "profile" && (
            <div className="settings-card">
              <h3>Profile Settings</h3>
              <input
                type="text"
                placeholder="Name"
                className="settings-input"
              />
              <input
                type="email"
                placeholder="Email"
                className="settings-input"
              />
              <button className="settings-button">Save Changes</button>
            </div>
          )}

          {activeSection === "security" && (
            <div className="settings-card">
              <h3>Security Settings</h3>
              <button className="settings-button">Change Password</button>
            </div>
          )}

          {activeSection === "bookings" && (
            <div className="settings-card">
              <h3>Booking Details</h3>
              <p>No bookings available.</p>
            </div>
          )}
        </div>
      </div>
      ;
    </div>
  );
};

export default Setting;
