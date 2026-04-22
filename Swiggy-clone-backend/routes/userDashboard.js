const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.get("/user/dashboard/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    const totalOrders = orders.length;

    const totalSpent = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    let totalProducts = 0;

    orders.forEach(order => {
      order.items.forEach(item => {
        totalProducts += item.quantity;
      });
    });

    const delivered = orders.filter(
      o => o.status === "Delivered"
    ).length;

    const cancelled = orders.filter(
      o => o.status === "Cancelled"
    ).length;

    const pending = orders.filter(
      o =>
        o.status === "Placed" ||
        o.status === "Preparing" ||
        o.status === "Out for Delivery"
    ).length;

    const statusChart = [
      { name: "Delivered", value: delivered },
      { name: "Pending", value: pending },
      { name: "Cancelled", value: cancelled }
    ];

    const monthMap = {};
    const weekMap = {};
    const dayMap = {};

    orders.forEach(order => {
      const month = new Date(order.createdAt).toLocaleString(
        "default",
        { month: "short" }
      );
      monthMap[month] =
        (monthMap[month] || 0) + order.totalAmount;
    });

    orders.forEach(order => {
      const day = new Date(order.createdAt).toLocaleDateString(
        "default",  
        { day: "numeric", month: "short" }
      );
      dayMap[day] = (dayMap[day] || 0) + order.totalAmount; 
    });

     orders.forEach(order => {
        const week = `Week ${Math.ceil(
          new Date(order.createdAt).getDate() / 7
        )}`;
         weekMap[week] = (weekMap[week] || 0) + order.totalAmount;
      });

    const dayChart = Object.keys(dayMap).map(day => ({
      day,
      amount: dayMap[day]
    }));  
    const weekChart = Object.keys(weekMap).map(week => ({
      week,
      amount: weekMap[week]
    }));

    const monthChart = Object.keys(monthMap).map(month => ({
      month,
      amount: monthMap[month]
    }));

    res.json({
      totalOrders,
      totalProducts,
      totalSpent,
      delivered,
      pending,
      cancelled,
      statusChart,
      monthChart,
      weekChart,
      dayChart,
      recentOrders: orders.slice(0, 5)
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;