import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminCategories.css";

function AdminCategories() {
  const API = import.meta.env.VITE_API;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // 🔥 FETCH
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/admin/categories`);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🔥 ADD
  const openAdd = () => {
    setName("");
    setImage(null);
    setPreview(null);
    setIsEditing(false);
    setShowModal(true);
  };

  // 🔥 EDIT
  const openEdit = (cat) => {
    setName(cat.name);
    setPreview(`${API}/${cat.image}`);
    setEditingId(cat._id);
    setIsEditing(true);
    setShowModal(true);
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) return alert("Name required");

    const formData = new FormData();
    formData.append("name", name);

    if (image) formData.append("image", image);

    try {
      if (isEditing) {
        await axios.put(
          `${API}/api/admin/categories/${editingId}`,
          formData
        );
      } else {
        await axios.post(
          `${API}/api/admin/categories`,
          formData
        );
      }

      setShowModal(false);
      fetchCategories();
    } catch (err) {
      console.log(err);
      alert("Operation failed");
    }
  };

  // 🔥 DELETE
  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await axios.delete(`${API}/api/admin/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="categories-container">
      <div className="categories-header">
        <h1>Food Management</h1>

        <button className="primary-btn" onClick={openAdd}>
          + Add Food
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="categories-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="3">No categories</td>
              </tr>
            ) : (
              categories.map((c) => (
                <tr key={c._id}>
                  <td>
                    <img
                      src={`${API}/${c.image}`}
                      width="60"
                    />
                  </td>

                  <td>{c.name}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => openEdit(c)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteCategory(c._id)}
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
            <h2>{isEditing ? "Edit Food" : "Add Food"}</h2>

            <form onSubmit={handleSubmit}>
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />

              {preview && <img src={preview} width="100" />}

              <div className="modal-actions">
                <button onClick={() => setShowModal(false)}>
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

export default AdminCategories;