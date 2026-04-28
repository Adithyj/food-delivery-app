import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrders.css";

function AdminOrders() {
  const API = import.meta.env.VITE_API;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    status: ""
  });

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  // 🔥 FETCH ORDERS
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/api/admin/orders`, {
        params: filters
      });

      setOrders(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔥 FILTER CHANGE
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 OPEN MODAL
  const openModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status || "Placed");
  };

  // 🔥 UPDATE STATUS
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
      alert("Update failed");
    }
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>Order Management</h1>

        <div className="filters">
          <select name="status" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Placed">Placed</option>
            <option value="Preparing">Preparing</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button onClick={fetchOrders}>Apply</button>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order</th>
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
                <td colSpan="7">No Orders Found</td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o._id}>
                  <td>{o._id.slice(-6)}</td>

                  <td>{o.userId?.name || "N/A"}</td>

                  <td>{o.restaurantId?.name || "N/A"}</td>

                  <td>
                    {o.items?.map((item, i) => (
                      <div key={i}>
                        {item.name} x {item.quantity}
                      </div>
                    ))}
                  </td>

                  <td>₹{o.totalAmount}</td>

                  <td>
                    <span className={`status ${o.status?.toLowerCase().replace(/ /g, "-")}`}>
                      {o.status}
                    </span>
                  </td>

                  <td>
                    <button onClick={() => openModal(o)}>
                      Update
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* MODAL */}
      {selectedOrder && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Update Status</h3>

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
  );
}

export default AdminOrders;