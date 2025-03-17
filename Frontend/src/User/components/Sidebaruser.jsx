import { Link } from "react-router-dom";
import { User, Lock, Calendar } from "lucide-react";
import "../css/setting.css";
import { IoIosArrowBack } from "react-icons/io";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <p className="setting">
        <IoIosArrowBack size={40} className="icon-side" />
        Setting
      </p>
      <ul>
        <li>
          <User />
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Lock size={18} />
          <Link to="/change-password">Change Password</Link>
        </li>
        <li>
          <Calendar size={18} />
          <Link to="/booking-details/:booking_id">Booking Details</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
