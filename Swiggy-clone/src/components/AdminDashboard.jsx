import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
    PieChart, Pie, Cell, Legend,
    ResponsiveContainer
} from "recharts";

function AdminDashboard() {

    const api = import.meta.env.VITE_API;

    const [data, setData] = useState({
        foods: 0,
        restaurants: 0,
        users: 0,
        orders: 0,
        payments: 0,
        placed: 0,
        preparing: 0,
        outForDelivery: 0,
        delivered: 0,
        cancelled: 0,
        today: 0,
        month: 0,
        year: 0
    });

    const fetchData = async () => {
        try {

            const [restaurantsRes, ordersRes] = await Promise.all([
                axios.get(`${api}/api/admin/restaurants`),
                axios.get(`${api}/api/admin/orders`)
            ]);

            const orders = ordersRes.data;

            let pending = 0;
            let today = 0;
            let month = 0;
            let year = 0;

            let placed = 0;
            let preparing = 0;
            let outForDelivery = 0;
            let delivered = 0;
            let cancelled = 0;
            const now = new Date();
            orders.forEach(order => {
                const d = new Date(order.createdAt);


                if (order.status === "Placed") placed++;
                if (order.status === "Preparing") preparing++;
                if (order.status === "Out for Delivery") outForDelivery++;
                if (order.status === "Delivered") delivered++;
                if (order.status === "Cancelled") cancelled++;


                if (d.toDateString() === now.toDateString()) today++;
                if (d.getMonth() === now.getMonth()) month++;
                if (d.getFullYear() === now.getFullYear()) year++;
            });


            setData({

                restaurants: restaurantsRes.data.length,
                users: 3,
                orders: ordersRes.data.length,
                payments: ordersRes.data.length,
                placed,
                preparing,
                outForDelivery,
                delivered,
                cancelled,
                today,
                month,
                year
            });

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    const salesData = [
        { name: "Today", value: data.today },
        { name: "Month", value: data.month },
        { name: "Year", value: data.year }
    ];

    const orderStatusData = [
        { name: "Placed", value: data.placed },
        { name: "Preparing", value: data.preparing },
        { name: "Out for Delivery", value: data.outForDelivery },
        { name: "Delivered", value: data.delivered },
        { name: "Cancelled", value: data.cancelled }
    ];

    const businessData = [
        { name: "Orders", value: data.orders },
        { name: "Payments", value: data.payments },
        { name: "Sales", value: data.year }
    ];

    const COLORS = [
        "#2196f3",
        "#ff9800",
        "#9c27b0",
        "#4caf50",
        "#f44336"
    ];

    return (
        <div className="dashboard-container">

            <h1 className="dashboard-title">Admin Dashboard</h1>


            <div className="dashboard-grid">

                <div className="card"><p className="card-title">Restaraunt</p><h2>{data.restaurants}</h2></div>

                <div className="card"><p className="card-title">Users</p><h2>{data.users}</h2></div>

                <div className="card"><p className="card-title">Total Orders</p><h2>{data.orders}</h2></div>
                <div className="card"><p className="card-title">Payments</p><h2>{data.payments}</h2></div>
                <div className="card"><p className="card-title">Placed Orders</p><h2>{data.placed}</h2></div>
                <div className="card"><p className="card-title">Preparing Orders</p><h2>{data.preparing}</h2></div>
                <div className="card"><p className="card-title">Out for Delivery</p><h2>{data.outForDelivery}</h2></div>
                <div className="card"><p className="card-title">Delivered Orders</p><h2>{data.delivered}</h2></div>
                <div className="card"><p className="card-title">Cancelled Orders</p><h2>{data.cancelled}</h2></div>
                <div className="card"><p className="card-title">Sales Today</p><h2>{data.today}</h2></div>
                <div className="card"><p className="card-title">Sales Month</p><h2>{data.month}</h2></div>
                <div className="card"><p className="card-title">Sales Year</p><h2>{data.year}</h2></div>

            </div>


            <div className="charts-container">


                <div className="chart-box">
                    <h3>Sales Overview</h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#1976d2" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>


                <div className="chart-box">
                    <h3>Order Status</h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={orderStatusData} dataKey="value" outerRadius={100} label>
                                {orderStatusData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-box">
                    <h3>Business Overview</h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={businessData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#673ab7" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;