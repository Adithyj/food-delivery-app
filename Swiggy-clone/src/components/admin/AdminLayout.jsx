import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Admin.css";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;