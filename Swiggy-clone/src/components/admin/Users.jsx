import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";

function Users() {
  const API = import.meta.env.VITE_API;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  // 🔥 FETCH USERS
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/admin/users`);
      setUsers(res.data);
    } catch (err) {
      console.log("Error fetching users", err);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 OPEN ADD
  const openAdd = () => {
    setForm({ name: "", email: "", phone: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  // 🔥 OPEN EDIT
  const openEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone
    });
    setEditingId(user._id);
    setIsEditing(true);
    setShowModal(true);
  };

  // 🔥 SAVE USER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      return alert("All fields required");
    }

    try {
      if (isEditing) {
        await axios.put(`${API}/api/admin/users/${editingId}`, form);
      } else {
        await axios.post(`${API}/api/admin/users`, form);
      }

      setShowModal(false);
      fetchUsers();

    } catch (err) {
      console.log(err);
      alert("Operation failed");
    }
  };

  // 🔥 DELETE USER
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(`${API}/api/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <h1>User Management</h1>
        <button onClick={openAdd} className="primary-btn">
          + Add User
        </button>
      </div>

      {/* LOADING */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4">No users found</td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => openEdit(u)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(u._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isEditing ? "Edit User" : "Add User"}</h2>

            <form onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
              />

              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
              />

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-btn">
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;