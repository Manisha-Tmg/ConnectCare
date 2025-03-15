import { useEffect, useState } from "react";
import "../../css/setting.css";
import Cookies from "js-cookie";
import { API } from "../../../env";

const CaretakerProfile = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const token = Cookies.get("accessToken");
      const id = Cookies.get("caretaker_id");

      if (!token || !id) {
        console.error("Missing authentication details");
        return;
      }

      try {
        const res = await fetch(`${API}api/caretakers/${id}`, {
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
      <p>
        <CaretakerSidebar />
        <Previous />
      </p>
    );
  }

  return (
    <div>
      <CaretakerSidebar />
      <Previous />
      <div className="profile-container-main">
        <h2>Profile</h2>
        <div className="profile-container">
          <label>Full Name</label>
          <input type="text" value={data.name || "NA"} disabled />

          <label>Username</label>
          <input type="email" value={data.username || "NA"} disabled />

          <label>Email</label>
          <input type="email" value={data.email || "NA"} disabled />

          <label>Speciality</label>
          <input type="text" value={data.speciality || "NA"} disabled />

          <label>Hourly Rate</label>
          <input type="text" value={data.hourly_rate || "NA"} disabled />

          <label>Experience</label>
          <input type="text" value={data.experience || "NA"} disabled />

          <label>Phone Number</label>
          <input type="text" value={data.phone || "NA"} disabled />
        </div>
      </div>
    </div>
  );
};

export default CaretakerProfile;
