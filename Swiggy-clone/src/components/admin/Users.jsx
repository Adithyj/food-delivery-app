import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";
import AdminLayout from "./AdminLayout";

function Users() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    phone: "",
    name: "",
    email: ""
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:8080/api/admin/users");
    setUsers(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setForm({ phone: "", name: "", email: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setForm({
      phone: user.phone,
      name: user.name,
      email: user.email
    });
    setEditingId(user._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await axios.put(
        `http://localhost:8080/api/admin/users/${editingId}`,
        form
      );
    } else {
      await axios.post(
        "http://localhost:8080/api/admin/users",
        form
      );
    }

    setShowModal(false);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(
      `http://localhost:8080/api/admin/users/${id}`
    );
    fetchUsers();
  };

  

  return (
    <> 
    <AdminLayout/>
    <div>
      <div className="user-header">
        <h1>User Management</h1>
        
      </div>
      <button className="primary-btn" onClick={openAddModal}>
          + Add User
        </button>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => openEditModal(u)}
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
          ))}
        </tbody>
      </table>

      
      { showModal&&(<div className="modal-overlay">
          <div className="modal">
            <h2>{isEditing ? "Edit User" : "Add User"}</h2>

            <form onSubmit={handleSubmit} className="modal-form">
              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
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
        </div>)}
      
    </div></>
   
  );
}

export default Users;