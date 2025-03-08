import React from "react";
import "../../css/task.css";
import CaretakerSidebar from "../../components/side";
import Previous from "../../components/Previous";

const Notifiation = () => {
  return (
    <div className="dashboard-container">
      <CaretakerSidebar />
      <div className="tasks">
        <h2>
          <Previous /> Notification
        </h2>
        <ul>
          <li>
            1. New booking request for 'Daily Assistance' is awaiting your
            response.
          </li>
          <li>2. You have received feedback from Ema Smith:</li>
          <li>
            3. Please review the updated service policies effective from March
            1, 2025.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Notifiation;
