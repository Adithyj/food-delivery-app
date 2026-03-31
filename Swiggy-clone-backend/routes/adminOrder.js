const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// GET ORDERS WITH VALID FILTERS
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
      .populate("restaurantId")
      .populate("items.itemId")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE STATUS
router.put("/admin/orders/:id/status", async (req, res) => {
  try {

    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;