import { useEffect, useState } from "react";
import "../css/setting.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebaruser";
import { API } from "../../env";
import Cookies from "js-cookie";

const Profile = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const token = Cookies.get("accessToken");
      const id = Cookies.get("user_id");

      if (!token || !id) {
        console.error("Missing authentication details");
        return;
      }

      try {
        const res = await fetch(`${API}api/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }

    fetchProfile();
  }, []);

  if (!data) {
    return (
      <div>
        <Header />
        <Sidebar />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="profile-container-main">
        <h2>Profile</h2>
        <div className="profile-container">
          <label>First Name</label>
          <input type="text" value={data.first_name || "NA"} disabled />

          <label>Last Name</label>
          <input type="text" value={data.last_name || "NA"} disabled />

          <label>Email</label>
          <input type="email" value={data.email || "NA"} disabled />

          <label>Phone Number</label>
          <input type="text" value={data.phone_number || "NA"} disabled />
        </div>
      </div>
    </div>
  );
};

export default Profile;
