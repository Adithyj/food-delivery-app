const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


// ✅ CREATE PRODUCT
router.post("/admin/products", async (req, res) => {
  try {
    const { name, price, category, restaurant, image } = req.body;

    // 🔥 validation
    if (!name || !price || !category || !restaurant || !image) {
      return res.status(400).json({
        message: "All fields including image URL are required"
      });
    }

    const product = new Product({
      name,
      price,
      category,
      restaurant,
      image
    });

    await product.save();

    res.status(201).json(product);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET PRODUCTS BY RESTAURANT
router.get("/admin/products/:restaurantId", async (req, res) => {
  try {
    const products = await Product.find({
      restaurant: req.params.restaurantId
    })
      .populate("category", "name")
      .populate("restaurant", "name");

    res.json(products);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ UPDATE PRODUCT
router.put("/admin/products/:id", async (req, res) => {
  try {
    const { name, price, category, restaurant, image } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    // 🔥 safe updates
    if (name) product.name = name;
    if (price) product.price = price;
    if (category) product.category = category;
    if (restaurant) product.restaurant = restaurant;
    if (image) product.image = image;

    await product.save();

    res.json(product);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ DELETE PRODUCT
router.delete("/admin/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ============================
   ✅ PUBLIC ROUTE (USER SIDE)
   ============================ */

router.get("/products", async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.json([]);
    }

    // 🔥 FIX: filter in DB, not JS
    const products = await Product.find()
      .populate("category", "name")
      .populate("restaurant", "name");

    const filtered = products.filter(
      (p) =>
        p.category &&
        p.category.name.toLowerCase() === category.toLowerCase()
    );

    res.json(filtered);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;