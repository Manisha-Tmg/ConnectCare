import React, { useEffect, useState } from "react";
import "../Css/UsrDetails.css";
import Cookies from "js-cookie";
import { API } from "../../env";

import Sidebar from "../components/AdminSidebar";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [data, setdata] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function userdetail() {
      const token = Cookies.get("accessToken");
      // const id = Cookies.get("user_id");
      try {
        const res = await fetch(`${API}api/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setdata(data);
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    }
    userdetail();
  }, []);

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");

  // Filter functionality
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Filtered users
  //   const filteredUsers = users.filter((user) => {
  //     const matchesSearch =
  //       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       user.email.toLowerCase().includes(searchTerm.toLowerCase());
  //     const matchesRole = filterRole === "" || user.role === filterRole;
  //     const matchesStatus = filterStatus === "" || user.status === filterStatus;

  //     return matchesSearch && matchesRole && matchesStatus;
  //   });

  return (
    <div className="user-panel">
      <Sidebar />
      <div className="profile-container-main">
        <h2>Profile</h2>
        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="profile-info">
            <strong>Gender:</strong> {data.first_name}
            {data.last_name}
          </div>
          <div className="profile-info">
            <strong>Email:</strong> {data.email}
          </div>
          <div className="profile-info">
            <strong>Phone:</strong> {data.phone}
          </div>
          <div className="profile-info">
            <strong>Username:</strong> {data.username}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
