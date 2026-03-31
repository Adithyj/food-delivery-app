const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const upload = require("../middlewares/upload");
const fs = require("fs");



router.post(
  "/admin/products",
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, price, category, restaurant } = req.body;

      const newProduct = new Product({
        name,
        price,
        category,
        restaurant,
        image: req.file ? req.file.path : null
      });

      await newProduct.save();
      res.json(newProduct);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);




router.get("/admin/products/:restaurantId", async (req, res) => {
  try {
    const products = await Product.find({
      restaurant: req.params.restaurantId
    }).populate("category restaurant");

    res.json(products);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




router.put(
  "/admin/products/:id",
  upload.single("image"),
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      
      if (req.file) {
        if (product.image && fs.existsSync(product.image)) {
          fs.unlinkSync(product.image);
        }
        product.image = req.file.path;
      }

      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.category = req.body.category || product.category;
      product.restaurant = req.body.restaurant || product.restaurant;

      await product.save();
      res.json(product);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);




router.delete("/admin/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    
    if (product.image && fs.existsSync(product.image)) {
      fs.unlinkSync(product.image);
    }

    await product.deleteOne();
    res.json({ message: "Product deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

router.get("/products", async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.json([]);
    }

    const products = await Product.find()
      .populate("category restaurant");

    const filtered = products.filter(
      (p) => p.category && p.category.name === category
    );

    res.json(filtered);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;