import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";
import Select from 'react-select';


function AdminRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const categoryOptions = categories.map(c => ({
    value: c._id,
    label: c.name
  }));




  useEffect(() => {
    fetchRestaurants();
    fetchCategories();
  }, []);

  const fetchRestaurants = async () => {
    const res = await axios.get(
      "http://localhost:8080/api/admin/restaurants"
    );
    setRestaurants(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get(
      "http://localhost:8080/api/admin/categories"
    );
    setCategories(res.data);
  };

  const openAddModal = () => {
    setName("");
    setLocation("");
    setRating("");
    setDeliveryTime("");
    setSelectedCategories([]);
    setImage(null);
    setPreview(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (restaurant) => {
    setName(restaurant.name);
    setLocation(restaurant.location);
    setRating(restaurant.rating);
    setDeliveryTime(restaurant.deliveryTime);
   setSelectedCategories(
    restaurant.categories.map((c) => ({ value: c._id, label: c.name }))
  );

    setPreview(`http://localhost:8080/${restaurant.image}`);
    setEditingId(restaurant._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleCategoryChange = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(
        selectedCategories.filter((c) => c !== id)
      );
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("rating", rating);
    formData.append("deliveryTime", deliveryTime);
    const categoryIds = selectedCategories.map(option => option.value);
    formData.append("categories", JSON.stringify(categoryIds));
   

    if (image) {
      formData.append("image", image);
    }

    if (isEditing) {
      await axios.put(
        `http://localhost:8080/api/admin/restaurants/${editingId}`,
        formData
      );
    } else {
      await axios.post(
        "http://localhost:8080/api/admin/restaurants",
        formData
      );
    }

    setShowModal(false);
    fetchRestaurants();
  };

  const deleteRestaurant = async (id) => {
    await axios.delete(
      `http://localhost:8080/api/admin/restaurants/${id}`
    );
    fetchRestaurants();
  };

  return (
    <div>
      <div className="user-header">
        <h1>Restaurant Management</h1><br />

       
      </div>
       <button className="primary-btn" onClick={openAddModal}>
          + Add Restaurant
        </button>
      <div style={{ display: "flext", justifyContent: "flex-end" }}>
        <input width="40%" label="search Products" variant="outlined"
        //value={filteredText} 
        //onsubmit={handleFilterChange}
        ></input>

      </div>
      <table className="admin-table">

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
          {restaurants.map((r) => (
            <tr key={r._id}>
              <td>
                <img
                  src={`http://localhost:8080/${r.image}`}
                  width="60"
                />
              </td>
              <td>{r.name}</td>
              <td>{r.location}</td>
              <td>{r.rating}</td>
              <td>{r.deliveryTime}</td>
              <td>
                {r.categories.map((c) => c.name).join(", ")}
              </td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => openEditModal(r)}
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
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>
              {isEditing
                ? "Edit Restaurant"
                : "Add Restaurant"}
            </h2>

            <form onSubmit={handleSubmit} className="modal-form">
              <input
                placeholder="Restaurant Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />

              <input
                type="number"
                step="0.1"
                placeholder="Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />

              <input
                placeholder="Delivery Time (e.g 30 mins)"
                value={deliveryTime}
                onChange={(e) =>
                  setDeliveryTime(e.target.value)
                }
              />

              <div className="select-category">
                <p>Select Categories:</p>
                <Select
                  isMulti
                  options={categoryOptions}
                  value={selectedCategories}
                  onChange={(selected) => setSelectedCategories(selected || [])}
                  placeholder="Select categories..."
                  className="multi-select"
                />
              </div>

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

export default AdminRestaurants;