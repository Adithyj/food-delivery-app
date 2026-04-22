const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const nodemailer = require('nodemailer');
const User = require("../models/User");
const handlebars = require('handlebars');
const PDFDocument = require("pdfkit");

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
   
    const { userId, restaurantId, items, email, name } = req.body;
    console.log(req.body);
    if (!userId || !restaurantId || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const user = await User.findById(req.body.userId);
    console.log(user);
    const formattedItems = items.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      
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
      console.log(user.email);

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

    
doc
  .fillColor("#444444") 
  .fontSize(24)
  .text("ORDER RECEIPT", { align: "center", charSpacing: 2 });

doc
  .moveTo(50, 80) 
  .lineTo(550, 80)
  .stroke("#eeeeee");

doc.moveDown(2);


doc
  .fillColor("#000000")
  .fontSize(12)
  .font("Helvetica-Bold") 
  .text("Customer Details:");

doc
  .font("Helvetica") 
  .fontSize(10)
  .text(`Name: ${user.name}`)
  .text(`Order ID: #${order._id.toString().toUpperCase()}`)
  .text(`Date: ${new Date().toLocaleDateString()}`);

doc.moveDown();


doc
  .rect(50, doc.y, 500, 20)
  .fill("#f9f9f9"); 

doc
  .fillColor("#333333")
  .font("Helvetica-Bold")
  .text("Item", 60, doc.y - 15)
  .text("Price", 300, doc.y - 15)
  .text("Qty", 400, doc.y - 15)
  .text("Total", 480, doc.y - 15);

doc.moveDown(0.5);


doc.font("Helvetica").fontSize(10).fillColor("#444444");

formattedItems.forEach(item => {
  const itemTotal = item.price * item.quantity;
  const currentY = doc.y;

  doc.text(item.name, 60, currentY);
  doc.text(`Rs. ${item.price}`, 300, currentY);
  doc.text(`Rs. ${item.quantity}`, 400, currentY);
  doc.text(`Rs.${itemTotal}`, 480, currentY);
  
  doc.moveDown(0.8);
});


doc.moveDown();
doc.moveTo(350, doc.y).lineTo(550, doc.y).stroke("#eeeeee");
doc.moveDown(0.5);

const summaryX = 350;
doc.text("Subtotal:", summaryX, doc.y);
doc.text(`Rs.${subtotal}`, 480, doc.y - 12);

doc.moveDown(0.5);
doc.text("GST (18%):", summaryX, doc.y);
doc.text(`Rs.${gst}`, 480, doc.y - 12);

doc.moveDown(0.5);
doc.fontSize(14).fillColor("#000000").font("Helvetica-Bold");
doc.text("Total Amount:", summaryX, doc.y);
doc.text(`Rs.${finalTotal}`, 480, doc.y - 15);

doc.end();


    res.status(201).json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get("/orders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;