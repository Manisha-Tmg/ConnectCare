import React from "react";
import "../css/dashboard.css";
import Previous from "../components/Previous";
import CaretakerSidebar from "../components/side";

const Dashboard = () => {
  return (
    <div>
      <CaretakerSidebar />
      <div className="dashboard-container">
        <h2 className="h-2">
          <Previous />
          Dashboard
        </h2>

        <section className="overview">
          <div className="card">
            <h2>Tasks Today</h2>
            <p className="task-count">10</p>
          </div>

          <div className="card bookings-card">
            <h2>Bookings</h2>
            <p className="bookings-count">5</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
