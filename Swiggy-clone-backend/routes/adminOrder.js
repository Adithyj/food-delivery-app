const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


router.get("/admin/orders", async (req, res) => {
  try {
    const { userId, restaurantId, itemId, status } = req.query;

    let query = {};

    if (userId) query.userId = userId;
    if (restaurantId) query.restaurantId = restaurantId;
    if (status) query.status = status;

    if (itemId) {
      query["items.itemId"] = itemId;
    }

    const orders = await Order.find(query)
      .populate("userId", "name email")
      .populate("restaurantId", "name image") // ✅ include image
      .populate({
        path: "items.itemId",
        select: "name price image description isVeg" // ✅ IMPORTANT
      })
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE ORDER STATUS
router.put("/admin/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    // 🔥 validation
    const validStatuses = [
      "Placed",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled"
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    order.status = status;
    await order.save();

    res.json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;