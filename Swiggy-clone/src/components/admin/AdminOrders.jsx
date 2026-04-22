import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import "./AdminOrders.css";

function AdminOrders() {
  const API = import.meta.env.VITE_API;

  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    userId: "",
    restaurantId: "",
    itemId: "",
    status: ""
  });

  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/api/admin/orders`, {
        params: filters
      });
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 open modal
  const openModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
  };

  // 🔥 update status
  const updateStatus = async () => {
    try {
      await axios.put(
        `${API}/api/admin/orders/${selectedOrder._id}/status`,
        { status: newStatus }
      );

      setSelectedOrder(null);
      fetchOrders();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-orders">

        <h1>Order Management</h1>

        {/* FILTERS */}
        <div className="filters">
          <input name="userId" placeholder="User ID" onChange={handleChange} />
          <input name="restaurantId" placeholder="Restaurant ID" onChange={handleChange} />
          <input name="itemId" placeholder="Item ID" onChange={handleChange} />

          <select name="status" onChange={handleChange}>
            <option value="">All Status</option>
            <option value="Placed">Placed</option>
            <option value="Preparing">Preparing</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button onClick={fetchOrders}>Apply</button>
        </div>

        {/* TABLE */}
        <table className="orders-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Restaurant</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

         <tbody>
  {orders.length === 0 ? (
    <tr>
      <td colSpan="6" style={{ textAlign: "center" }}>
        No Orders Found
      </td>
    </tr>
  ) : (
    orders.map((order) => (
      <tr key={order._id}>

        <td>{order.userId}</td>

        <td>
          {order.restaurantId && typeof order.restaurantId === "object"
            ? order.restaurantId.name
            : "N/A"}
        </td>

        <td>
          {order.items?.map((item, index) => (
            <div key={index}>
              {item.name} x {item.quantity}
            </div>
          ))}
        </td>

        <td>₹{order.totalAmount}</td>

        <td>
          <span
            className={`status ${
              order?.status
                ? order.status.toLowerCase().replace(/ /g, "-")
                : ""
            }`}
          >
            {order?.status || "N/A"}
          </span>
        </td>

        <td>
          <button onClick={() => openModal(order)}>
            Update
          </button>
        </td>

      </tr>
    ))
  )}
</tbody>
        </table>

       
        {selectedOrder && (
          <div className="modal-overlay">
            <div className="modal">

              <h3>Update Order Status</h3>

              <p>Order ID: {selectedOrder._id.slice(-6)}</p>

              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option>Placed</option>
                <option>Preparing</option>
                <option>Out for Delivery</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>

              <div className="modal-actions">
                <button onClick={updateStatus}>Update</button>
                <button onClick={() => setSelectedOrder(null)}>Cancel</button>
              </div>

            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}

export default AdminOrders;