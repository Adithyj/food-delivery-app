import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./AdminRestaurants.css";

function AdminRestaurants() {
  const API = import.meta.env.VITE_API;

  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    location: "",
    rating: "",
    deliveryTime: ""
  });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  
  const fetchData = async () => {
    try {
      setLoading(true);

      const [res1, res2] = await Promise.all([
        axios.get(`${API}/api/admin/restaurants`),
        axios.get(`${API}/api/admin/categories`)
      ]);

      setRestaurants(res1.data);
      setCategories(res2.data);

    } catch (err) {
      console.log(err);
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const categoryOptions = categories.map(c => ({
    value: c._id,
    label: c.name
  }));

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const openAdd = () => {
    setForm({ name: "", location: "", rating: "", deliveryTime: "" });
    setSelectedCategories([]);
    setImage(null);
    setPreview(null);
    setIsEditing(false);
    setShowModal(true);
  };

 
  const openEdit = (r) => {
    setForm({
      name: r.name,
      location: r.location,
      rating: r.rating,
      deliveryTime: r.deliveryTime
    });

    setSelectedCategories(
      r.categories.map(c => ({
        value: c._id,
        label: c.name
      }))
    );

    setPreview(`${API}/${r.image}`);
    setEditingId(r._id);
    setIsEditing(true);
    setShowModal(true);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.location) {
      return alert("Required fields missing");
    }

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("location", form.location);
    formData.append("rating", form.rating);
    formData.append("deliveryTime", form.deliveryTime);

    const categoryIds = selectedCategories.map(c => c.value);
    formData.append("categories", JSON.stringify(categoryIds));

    if (image) formData.append("image", image);

    try {
      if (isEditing) {
        await axios.put(
          `${API}/api/admin/restaurants/${editingId}`,
          formData
        );
      } else {
        await axios.post(
          `${API}/api/admin/restaurants`,
          formData
        );
      }

      setShowModal(false);
      fetchData();

    } catch (err) {
      console.log(err);
      alert("Save failed");
    }
  };

  
  const deleteRestaurant = async (id) => {
    if (!window.confirm("Delete this restaurant?")) return;

    try {
      await axios.delete(`${API}/api/admin/restaurants/${id}`);
      fetchData();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="restaurants-container">
      <div className="restaurants-header">
        <h1>Restaurant Management</h1>

        <button className="primary-btn" onClick={openAdd}>
          + Add Restaurant
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="restaurants-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Rating</th>
              <th>Delivery</th>
              <th>Categories</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {restaurants.length === 0 ? (
              <tr>
                <td colSpan="7">No restaurants</td>
              </tr>
            ) : (
              restaurants.map(r => (
                <tr key={r._id}>
                  <td>
                    <img src={`${API}/${r.image}`} width="60" />
                  </td>

                  <td>{r.name}</td>
                  <td>{r.location}</td>
                  <td>{r.rating}</td>
                  <td>{r.deliveryTime}</td>

                  <td>
                    {r.categories.map(c => c.name).join(", ")}
                  </td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => openEdit(r)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteRestaurant(r._id)}
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

      
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isEditing ? "Edit Restaurant" : "Add Restaurant"}</h2>

            <form onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
              />

              <input
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
              />

              <input
                name="rating"
                placeholder="Rating"
                value={form.rating}
                onChange={handleChange}
              />

              <input
                name="deliveryTime"
                placeholder="Delivery Time"
                value={form.deliveryTime}
                onChange={handleChange}
              />

              <Select
                isMulti
                options={categoryOptions}
                value={selectedCategories}
                onChange={(val) => setSelectedCategories(val || [])}
              />

              <input
                type="file"
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

export default AdminRestaurants;