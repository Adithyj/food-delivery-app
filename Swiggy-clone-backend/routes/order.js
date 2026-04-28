const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const PDFDocument = require("pdfkit");
const Menu = require("../models/Menu");



router.put("/orders/:id/cancel", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "Placed") {
      return res.status(400).json({
        message: "Order cannot be cancelled now"
      });
    }

    order.status = "Cancelled";
    await order.save();

    res.json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/order", async (req, res) => {
  try {
    const { userId, restaurantId, items } = req.body;

    if (!userId || !restaurantId || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const user = await User.findById(userId);

   
    const formattedItems = items.map(item => ({
      itemId: item.itemId,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    const subtotal = formattedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const gst = subtotal * 0.18;
    const finalTotal = subtotal + gst;

    const order = new Order({
      userId,
      restaurantId,
      items: formattedItems,
      totalAmount: finalTotal,
      status: "Placed"
    });

    await order.save();

    
    const doc = new PDFDocument();
    let buffers = [];

    doc.on("data", buffers.push.bind(buffers));

    doc.on("end", async () => {
      const pdfBuffer = Buffer.concat(buffers);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.user,
          pass: process.env.pass
        }
      });

      await transporter.sendMail({
        from: process.env.user,
        to: user.email,
        subject: "Order Receipt",
        text: "Your order receipt is attached",
        attachments: [
          {
            filename: "invoice.pdf",
            content: pdfBuffer
          }
        ]
      });
    });

    doc.text("Order Receipt");
    doc.end();

    res.status(201).json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




router.get("/orders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate("restaurantId", "name image")
      .populate({
        path: "items.itemId",
        select: "name price description image isVeg"
      })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/order/foods/byIds", async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || ids.length === 0) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    const foods = await Menu.find({
      _id: { $in: ids }
    }).select("name price image description isVeg");

    res.json(foods);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;