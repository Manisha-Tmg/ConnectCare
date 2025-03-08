import Header from "../components/Header";
import Sidebar from "../components/Sidebaruser";
import "../css/setting.css";

const ChangePassword = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="change-password-container">
        <h2>Change Password</h2>
        <label>Current Password</label>
        <input type="password" />

        <label>New Password</label>
        <input type="password" />

        <label>Confirm New Password</label>
        <input type="password" />

        <button>Change Password</button>
      </div>{" "}
    </div>
  );
};

export default ChangePassword;
