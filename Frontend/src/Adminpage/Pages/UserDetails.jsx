import React, { useEffect, useState } from "react";
import "../Css/UserDetails.css";
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
    <div className="user-destails-page">
      <Sidebar />
      <div className="user-destails-container">
        <div className="user-destails-card">
          <div className="user-destails-header">
            <img
              src={data.profile_picture_url}
              alt="Profile"
              className="user-destails-pic"
            />
            <div className="user-destails-container-main">
              <h2>Profile</h2>
              <div className="user-destails-section">
                <h3>Personal Information</h3>
                <div className="user-destails-info">
                  <strong>Name:</strong> {data.name}
                </div>
                <div className="user-destails-info">
                  <strong>Gender:</strong> {data.gender}
                </div>
                <div className="user-destails-info">
                  <strong>Email:</strong> {data.email}
                </div>
                <div className="user-destails-info">
                  <strong>Phone:</strong> {data.phone}
                </div>
                <div className="user-destails-info">
                  <strong>Username:</strong> {data.username}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
