import { useEffect, useState } from "react";
import "../../css/setting.css";
import Cookies from "js-cookie";
import { API } from "../../../env";
import CaretakerSidebar from "../../components/side";
import Previous from "../../components/Previous";

const CaretakerProfile = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchCaretakerProfile() {
      const Token = Cookies.get("accessToken");
      const id = Cookies.get("caretaker_id");

      if (!Token || !id) {
        console.error("Missing authentication details");
        return;
      }

      try {
        const res = await fetch(`${API}api/caretakers/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${Token}`,
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

    fetchCaretakerProfile();
  }, []);

  if (!data) {
    return (
      <div>
        <CaretakerSidebar />
        <Previous />
      </div>
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
