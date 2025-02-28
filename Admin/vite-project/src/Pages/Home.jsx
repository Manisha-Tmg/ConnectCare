import React, { useState } from "react";
import "../Css/Admin.css";
import { FiUserPlus, FiTrash2 } from "react-icons/fi";
import Sidebar from "../COmponents/SIdebar";

const AdminDashboard = () => {
  const [caretakers, setCaretakers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);

  const [newCaretaker, setNewCaretaker] = useState({ name: "", email: "" });

  const addCaretaker = () => {
    if (newCaretaker.name && newCaretaker.email) {
      const newEntry = {
        id: caretakers.length + 1,
        name: newCaretaker.name,
        email: newCaretaker.email,
      };
      setCaretakers([...caretakers, newEntry]);
      setNewCaretaker({ name: "", email: "" });
    }
  };

  const deleteCaretaker = (id) => {
    setCaretakers(caretakers.filter((caretaker) => caretaker.id !== id));
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="admin-content">
        <h2>Admin Dashboard</h2>

        {/* Caretaker Management */}
        <div className="card">
          <h3>Manage Caretakers</h3>
          <div className="add-caretaker">
            <input
              type="text"
              placeholder="Caretaker Name"
              value={newCaretaker.name}
              onChange={(e) =>
                setNewCaretaker({ ...newCaretaker, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Caretaker Email"
              value={newCaretaker.email}
              onChange={(e) =>
                setNewCaretaker({ ...newCaretaker, email: e.target.value })
              }
            />
            <button onClick={addCaretaker} className="btn add-btn">
              <FiUserPlus /> Add
            </button>
          </div>
          <ul className="caretaker-list">
            {caretakers.map((caretaker) => (
              <li key={caretaker.id}>
                <span>
                  {caretaker.name} - {caretaker.email}
                </span>
                <button
                  onClick={() => deleteCaretaker(caretaker.id)}
                  className="btn delete-btn"
                >
                  <FiTrash2 /> Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
