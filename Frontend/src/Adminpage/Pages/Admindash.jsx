import React, { useEffect, useState } from "react";
import "../Css/admindashboard.css";
import Cookies from "js-cookie";
import { FaCalendarCheck } from "react-icons/fa";
import { API } from "../../env";
import Sidebar from "../components/AdminSidebar";

const Admindash = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      const token = Cookies.get("accessToken");
      try {
        const res = await fetch(`${API}api/admin/dashboard/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }
    fetchDashboardData();
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="dashboard-containerr">
        <h2 className="dashboard-header">Dashboard</h2>
        <section className="overview">
          <div className="card">
            <div className="card-icon-wrapper">
              <FaCalendarCheck className="card-icon" />
            </div>
            <h2>Total Bookings</h2>
            <p className="task-count">{data?.total_bookings || 0}</p>
          </div>
          <div className="card">
            <div className="card-icon-wrapper">
              <FaCalendarCheck className="card-icon" />
            </div>
            <h2>Total Caretaker</h2>
            <p className="task-count">{data?.total_caretaker || 0}</p>
          </div>
          <div className="card">
            <div className="card-icon-wrapper">
              <FaCalendarCheck className="card-icon" />
            </div>
            <h2>Total User</h2>
            <p className="task-count">{data?.total_user || 0}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admindash;
