import React, { useEffect, useState } from "react";
import "../../css/dashboard.css";
import Previous from "../../components/Previous";
import CaretakerSidebar from "../../components/side";
import { API } from "../../../env";
import Cookies from "js-cookie";
import {
  FaCalendarCheck,
  FaTasks,
  FaUserClock,
  FaChartLine,
} from "react-icons/fa";

const Dashboard = () => {
  const [data, setdata] = useState();
  const [totalbooking, setTotalbooking] = useState([]);

  useEffect(() => {
    async function handledash() {
      const token = Cookies.get("accessToken");

      try {
        const res = await fetch(`${API}caretaker/dashboard/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        setdata(data);
      } catch (error) {}
    }
    handledash();
  }, []);

  console.log("ttt", data);

  return (
    <div>
      <CaretakerSidebar />
      <div className="dashboard-container">
        <h2 className="dashboard-header">
          {/* <Previous /> */}
          Dashboard
        </h2>

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
              <FaTasks className="card-icon" />
            </div>
            <h2>Pending Tasks</h2>
            <p className="task-count">{data?.pending_tasks || 0}</p>
          </div>
          <div className="card">
            <div className="card-icon-wrapper">
              <FaUserClock className="card-icon" />
            </div>
            <h2>Completed</h2>
            <p className="task-count">{data?.completed_tasks || 0}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
