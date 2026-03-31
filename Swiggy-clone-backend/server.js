const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const restaurantRoutes = require("./routes/restaurants");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/adminOrder"));
app.use("/api", require("./routes/order"));
app.use("/api", require("./routes/restaurantDetails"));
app.use("/api", restaurantRoutes);
app.use("/api/auth", require("./routes/auth"));
app.use("/api", require("./routes/Category"));
app.use("/api", require("./routes/adminUser"));
app.use("/api", require("./routes/adminCategory"));
app.use("/api", require("./routes/adminRestaurant"));
app.use("/api", require("./routes/adminProdcut"));
app.use("/uploads", express.static("uploads"));
app.use("/api", require("./routes/adminMenu"));

app.post("/payment-intent", async (req, res) => {
  const { amount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(amount),
    currency: "inr",
    payment_method_types: ["card"],
  });

  res.json({
    client_secret: paymentIntent.client_secret,
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});