import { useState } from "react";
import "../css/setting.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebaruser";

const Profile = () => {
  const [email, setEmail] = useState("annataylor@example.com");

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="profile-container">
        <h2>Profile</h2>
        <label>Full Name</label>
        <input type="text" value="Anna Taylor" disabled />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>Update</button>

        <label>Phone Number</label>
        <input type="text" value="+1 (987) 654 321" disabled />
      </div>
    </div>
  );
};

export default Profile;
