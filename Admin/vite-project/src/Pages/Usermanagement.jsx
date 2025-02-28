import React from "react";
import "../Css/Admin.css";

const Usermanagement = () => {
  const [user, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);

  const [newuser, setNewuser] = useState({ name: "", email: "" });

  const addCaretaker = () => {
    if (newuser.name && newuser.email) {
      const newEntry = {
        id: user.length + 1,
        name: newuser.name,
        email: newuser.email,
      };
      setUsers([...user, newEntry]);
      setNewuser({ name: "", email: "" });
    }
  };

  const deleteCaretaker = (id) => {
    setuser(user.filter((caretaker) => caretaker.id !== id));
  };
  return (
    <div className="caretaker-section">
      <h3>Manage Caretakers</h3>
      <div className="add-caretaker">
        <input
          type="text"
          placeholder="Caretaker Name"
          value={newuser.name}
          onChange={(e) => setnewuser({ ...newuser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Caretaker Email"
          value={newuser.email}
          onChange={(e) => setnewuser({ ...newuser, email: e.target.value })}
        />
        <button onClick={addCaretaker}>
          <FiUserPlus /> Add Caretaker
        </button>
      </div>
      <ul className="caretaker-list">
        {user.map((users) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button
              onClick={() => deleteCaretaker(user.id)}
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

export default Usermanagement;
