import React, { useEffect, useState } from "react";
import "../Css/UsrDetails.css";
import Cookies from "js-cookie";
import { API } from "../../env";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Sidebar from "../components/AdminSidebar";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const UserPanel = () => {
  const [users, setUsers] = useState([]);
  const [datas, setdata] = useState([]);

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
  useEffect(() => {
    userdetail();
  }, []);

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");

  // Filter functionality
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleStatusChange = async (id, currentStatus) => {
    const token = Cookies.get("accessToken");

    try {
      const response = await fetch(`${API}users/${id}/change-status/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_approved: !currentStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        const updated = users.map((ct) =>
          ct.id === id ? { ...ct, is_approved: data.is_approved } : ct
        );
        setUsers(updated);
      } else {
        console.error("Status update failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function handleDelete(id) {
    const token = Cookies.get("accessToken");

    try {
      const res = await fetch(`${API}api/admin/delete/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        userdetail(data);
        toast.success("User deleted successfully");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    }
  }

  return (
    <div className="user-panel">
      <Sidebar />
      <div className="panel-header">
        <h1>User Management</h1>
        <Link to={"/admin/Adduser"}>
          <button className="add-user-btn">+ Add User</button>
        </Link>
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
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>{user.role}</span>
                </td>
                <td>
                  <span className={`status-badge ${user.is_approved}`}>
                    {user.is_approved ? "Verified" : "Rejected"}
                  </span>
                </td>
                <td>{user.username}</td>
                <td className="actions">
                  <Link to={`/users/${user.id}`}>
                    <button className="edit-btn">
                      <FaEye />
                    </button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    <MdDelete />
                  </button>

                  <button
                    className={`status-btnn ${
                      user.is_approved ? "verify" : "Reject"
                    }`}
                    onClick={() =>
                      handleStatusChange(user.id, user.is_approved)
                    }
                  >
                    {user.is_approved ? "Reject" : "Verify"}
                  </button>
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
