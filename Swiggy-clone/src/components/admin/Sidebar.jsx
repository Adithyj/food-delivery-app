import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Admin Panel</h2>

      <nav>
        <NavLink to="/admin" end>Dashboard</NavLink>
        <NavLink to="/admin/users">User Management</NavLink>
        <NavLink to="/admin/categories">Food Management</NavLink>
        <NavLink to="/admin/restaurants">Restaurant Management</NavLink>
        <NavLink to="/admin/products">Product Management</NavLink>
        <NavLink to="/admin/orders">Orders</NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;