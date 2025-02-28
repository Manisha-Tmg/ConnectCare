import React from "react";
import "../Css/Admin.css";

const Caretakermanagement = () => {
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
    <div className="caretaker-section">
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
        <button onClick={addCaretaker}>
          <FiUserPlus /> Add Caretaker
        </button>
      </div>
      <ul className="caretaker-list">
        {caretakers.map((caretaker) => (
          <li key={caretaker.id}>
            {caretaker.name} - {caretaker.email}
            <button
              onClick={() => deleteCaretaker(caretaker.id)}
              className="delete-btn"
            >
              <FiTrash2 /> Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Caretakermanagement;
