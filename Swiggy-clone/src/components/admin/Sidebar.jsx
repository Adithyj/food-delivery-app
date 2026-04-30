import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminLayout.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Admin</h2>

      <nav>
        <NavLink to="/admin" end>Dashboard</NavLink>
        <NavLink to="/admin/users">Users</NavLink>
        <NavLink to="/admin/categories">Food</NavLink>
        <NavLink to="/admin/restaurants">Restaurants</NavLink>
        <NavLink to="/admin/orders">Orders</NavLink>
        <NavLink to="/admin/menu">Menu</NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;