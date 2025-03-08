import { Link } from "react-router-dom";
import { User, Lock, Calendar } from "lucide-react";
import "../css/setting.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <User size={18} />
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Lock size={18} />
          <Link to="/change-password">Change Password</Link>
        </li>
        <li>
          <Calendar size={18} />
          <Link to="/booking-details">Booking Details</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
