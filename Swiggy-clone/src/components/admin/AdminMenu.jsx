import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./AdminMenu.css";

function AdminMenu() {
  const API = import.meta.env.VITE_API;

  const [menu, setMenu] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    restaurant: "",
    name: "",
    price: "",
    description: "",
    isVeg: false,
    image: ""
  });

  const [preview, setPreview] = useState(null);

  // FETCH
  const fetchData = async () => {
    try {
      setLoading(true);

      const [menuRes, restRes] = await Promise.all([
        axios.get(`${API}/api/admin/menu`),
        axios.get(`${API}/api/admin/restaurants`)
      ]);

      setMenu(menuRes.data);
      setRestaurants(restRes.data);

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

  // DROPDOWN
  const restaurantOptions = restaurants.map(r => ({
    value: r._id,
    label: r.name
  }));

  // CHANGE
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // ADD
  const openAdd = () => {
    setForm({
      restaurant: "",
      name: "",
      price: "",
      description: "",
      isVeg: false,
      image: ""
    });
    setPreview(null);
    setIsEditing(false);
    setShowModal(true);
  };

  // EDIT
  const openEdit = (item) => {
    setForm({
      restaurant: item.restaurant?._id || "",
      name: item.name,
      price: item.price,
      description: item.description,
      isVeg: item.isVeg,
      image: item.image
    });

    setPreview(item.image);
    setEditingId(item._id);
    setIsEditing(true);
    setShowModal(true);
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.restaurant || !form.name || !form.price || !form.image) {
      return alert("Required fields missing");
    }

    try {
      if (isEditing) {
        await axios.put(
          `${API}/api/admin/menu/${editingId}`,
          form
        );
      } else {
        await axios.post(
          `${API}/api/admin/menu`,
          form
        );
      }

      setShowModal(false);
      fetchData();

    } catch (err) {
      console.log(err);
      alert("Save failed");
    }
  };

  // DELETE
  const deleteItem = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await axios.delete(`${API}/api/admin/menu/${id}`);
      fetchData();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="menu-container">

      <div className="menu-header">
        <h1>Menu Management</h1>

        <button className="primary-btn" onClick={openAdd}>
          + Add Item
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="menu-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Restaurant</th>
              <th>Price</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {menu.length === 0 ? (
              <tr>
                <td colSpan="6">No menu items</td>
              </tr>
            ) : (
              menu.map(item => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.image}
                      width="60"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/60")
                      }
                    />
                  </td>

                  <td>{item.name}</td>
                  <td>{item.restaurant?.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.isVeg ? "Veg" : "Non-Veg"}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => openEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteItem(item._id)}
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
            <h2>{isEditing ? "Edit Item" : "Add Item"}</h2>

            <form onSubmit={handleSubmit}>

              <Select
                options={restaurantOptions}
                value={restaurantOptions.find(r => r.value === form.restaurant)}
                onChange={(val) =>
                  setForm({ ...form, restaurant: val.value })
                }
              />

              <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
              <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
              <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />

              <label>
                <input
                  type="checkbox"
                  name="isVeg"
                  checked={form.isVeg}
                  onChange={handleChange}
                />
                Veg
              </label>

              <input
                name="image"
                placeholder="Enter Image URL"
                value={form.image}
                onChange={(e) => {
                  handleChange(e);
                  setPreview(e.target.value);
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

export default AdminMenu;