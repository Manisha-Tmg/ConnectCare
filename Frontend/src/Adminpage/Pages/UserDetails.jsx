import React, { useEffect, useState } from "react";
import "../Css/UsrDetails.css";
import Cookies from "js-cookie";
import { API } from "../../env";
import Sidebar from "../components/AdminSidebar";

const UserPanel = () => {
  const [users, setUsers] = useState([]);
  const [datas, setdata] = useState([]);

  useEffect(() => {
    async function userdetail() {
      const token = Cookies.get("accessToken");
      try {
        const res = await fetch(`${API}api/users/`, {
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
      <div className="panel-header">
        <h1>User Management</h1>
        <button className="add-user-btn">+ Add User</button>
      </div>

      <div className="search-filter-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.first_name}
                  {user.last_name}
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>{user.role}</span>
                </td>
                <td>
                  <span className={`status-badge ${user.is_active}`}>
                    {user.is_active ? "Active" : "Not Active"}
                  </span>
                </td>
                <td>{user.username}</td>
                <td className="actions">
                  <button className="edit-btn">View</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPanel;
