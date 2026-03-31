import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import "./AdminOrders.css";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  const [filters, setFilters] = useState({
    userId: "",
    restaurantId: "",
    itemId: "",
    status: ""
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/admin/orders",
        { params: filters }
      );
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

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/orders/${id}/status`,
        { status }
      );
      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminLayout>

      <div className="admin-orders">

        <h1>Order Management</h1>

        
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

    
        <table className="orders-table">

          <thead>
            <tr>
              <th>User</th>
              <th>Restaurant</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Update</th>
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

              orders.map(order => (

                <tr key={order._id}>

                  <td>{order.userId}</td>

                  <td>{order.restaurantId?.name || "N/A"}</td>

                  <td>
                    {order.items.map(item => (
                      <div key={item._id}>
                        {item.name} x {item.quantity}
                      </div>
                    ))}
                  </td>

                  <td>₹{order.totalAmount}</td>

                  <td>
                    <span className={`status ${order.status.toLowerCase().replace(/ /g, "-")}`}>
                      {order.status}
                    </span>
                  </td>

                  <td>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                    >
                      <option>Placed</option>
                      <option>Preparing</option>
                      <option>Out for Delivery</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}

export default AdminOrders;