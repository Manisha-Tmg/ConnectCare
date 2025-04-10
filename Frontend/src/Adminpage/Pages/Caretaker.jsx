import React, { useEffect, useState } from "react";
import "../Css/CaretakerDetails.css";
import Cookies from "js-cookie";
import { API } from "../../env";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Sidebar from "../components/AdminSidebar";
import { ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

const CaretakerPanel = () => {
  const [caretakers, setCaretakers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCaretakers();
  }, []);

  const fetchCaretakers = async () => {
    const token = Cookies.get("accessToken");
    try {
      const response = await fetch(`${API}api/caretakers/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCaretakers(data);
    } catch (error) {
      console.error("Error fetching caretakers:", error);
    }
  };

  // async function handledelete() {
  //   const id = Cookies.get("user_id");
  //   try {
  //     const res = await fetch(`${API}api/users/delete/${id}`, {
  //       headers: "DELETE",
  //     });
  //   } catch (error) {
  //     toast.error("erroro");
  //   }
  // }
  const handleStatusChange = async (id, currentStatus) => {
    const token = Cookies.get("accessToken");

    try {
      const response = await fetch(`${API}caretakers/${id}/change-status/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_approved: !currentStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        const updated = caretakers.map((ct) =>
          ct.id === id ? { ...ct, is_approved: data.is_approved } : ct
        );
        setCaretakers(updated);
      } else {
        console.error("Status update failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredCaretakers = caretakers.filter((ct) =>
    ct.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Sidebar />
      <div className="caretaker-panel">
        <div className="panel-header">
          <h1>Caretaker Management</h1>
          <Link to="/admin/Addcaretaker">
            <button className="add-caretaker-btn">+ Add Caretaker</button>
          </Link>
        </div>

        <div className="search-filter-container">
          <input
            type="text"
            placeholder="Search caretakers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="caretakers-table-container">
          <table className="caretakers-table">
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
              {filteredCaretakers.map((caretaker) => (
                <tr key={caretaker.id}>
                  <td>{caretaker.name}</td>
                  <td>{caretaker.email}</td>
                  <td>
                    <span className={`role-badge ${caretaker.role}`}>
                      {caretaker.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        caretaker.is_approved ? "verified" : "Rejected"
                      }`}
                    >
                      {caretaker.is_approved ? "verified" : "Rejected"}
                    </span>
                  </td>
                  <td>{caretaker.username}</td>
                  <td className="actions">
                    <Link to={`/caretakers/${caretaker.id}`}>
                      <button className="edit-btn">
                        <FaEye />
                      </button>
                    </Link>
                    <button className="delete-btn" onClick={handledelete}>
                      <MdDelete />
                    </button>
                    <button
                      className={`status-btnn ${
                        caretaker.is_approved ? "verify" : "Reject"
                      }`}
                      onClick={() =>
                        handleStatusChange(caretaker.id, caretaker.is_approved)
                      }
                    >
                      {caretaker.is_approved ? "Reject" : "Verify"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CaretakerPanel;
