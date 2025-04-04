import React, { useEffect, useState } from "react";
import "../Css/CaretakerDetails.css";
import Cookies from "js-cookie";
import { API } from "../../env";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Sidebar from "../components/AdminSidebar";

const CaretakerPanel = () => {
  const [caretakers, setcaretakers] = useState([]);
  const [datas, setdata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function caretakerdetail() {
      const token = Cookies.get("accessToken");
      try {
        const res = await fetch(`${API}api/caretakers/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setdata(data);
        setcaretakers(data);
      } catch (error) {
        console.log(error);
      }
    }
    caretakerdetail();
  }, []);

  //
  return (
    <div>
      <Sidebar />
      <div className="caretaker-panel">
        <div className="panel-header">
          <h1>Caretaker Management</h1>
          <Link to={"/admin/Addcaretaker"}>
            <button className="add-caretaker-btn">+ Add Caretaker</button>
          </Link>
        </div>

        <div className="search-filter-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search caretakers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="caretakers-table-container">
          <table className="caretakers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>username</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {caretakers.map((caretaker) => (
                <tr key={caretaker.id}>
                  <td>{caretaker.name}</td>
                  <td>{caretaker.email}</td>
                  <td>
                    <span className={`role-badge ${caretaker.role}`}>
                      {caretaker.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${caretaker.is_active}`}>
                      {caretaker.is_active ? "Active" : "Not Active"}
                    </span>
                  </td>
                  <td>{caretaker.username}</td>
                  <td className="actions">
                    <Link to={`/caretakers/${caretaker.id}`}>
                      <button className="edit-btn">
                        <FaEye />
                      </button>
                    </Link>
                    <button className="delete-btn">
                      <MdDelete />
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
