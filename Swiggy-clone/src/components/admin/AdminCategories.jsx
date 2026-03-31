import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

import TablePagination from "@mui/material/TablePagination";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const notifySuccess = () => {
    toast.success("Successful!");
  };

  const notifyFail = () => {
    toast.error("Error occurred");
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/categories");
      setCategories(res.data);
    } catch {
      notifyFail();
    }
  };

  const openAddModal = () => {
    setName("");
    setImage(null);
    setPreview(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (category) => {
    setName(category.name);
    setPreview(`http://localhost:8080/${category.image}`);
    setEditingId(category._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);

    if (image) {
      formData.append("image", image);
    }

    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:8080/api/admin/categories/${editingId}`,
          formData
        );
      } else {
        await axios.post(
          "http://localhost:8080/api/admin/categories",
          formData
        );
      }

      notifySuccess();
      setShowModal(false);
      fetchCategories();
    } catch {
      notifyFail();
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/categories/${id}`);
      notifySuccess();
      fetchCategories();
    } catch {
      notifyFail();
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="user-header">
        <h1>Food Management</h1>
        
      </div>
      <button className="primary-btn" onClick={openAddModal}>
          + Add Food
        </button>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {categories
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((c) => (
              <tr key={c._id}>
                <td>
                  <img
                    src={`http://localhost:8080/${c.image}`}
                    alt={c.name}
                    width="60"
                  />
                </td>

                <td>{c.name}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => openEditModal(c)}
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
            ))}
        </tbody>
      </table>

      <TablePagination
        component="div"
        count={categories.length}
         page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[3, 10, 25]}
        /> 
      

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isEditing ? "Edit Category" : "Add Category"}</h2>

            <form onSubmit={handleSubmit} className="modal-form">
              <input
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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

              {preview && <img src={preview} alt="preview" width="100" />}

              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)}>
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