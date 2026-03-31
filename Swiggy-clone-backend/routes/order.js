const express = require("express");
const router = express.Router();
const Order = require("../models/Order");



router.post("/order", async (req, res) => {
  try {

    const { userId, restaurantId, items, status } = req.body;

   
    if (!userId || !restaurantId || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

   
    const formattedItems = items.map(item => ({
      itemId: item._id || item.itemId,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

   
    const totalAmount = formattedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    
    const order = new Order({
      userId,
      restaurantId,
      items: formattedItems,
      totalAmount,
      status: status || "Placed" 
    });

    await order.save();

    res.status(201).json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;