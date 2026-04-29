const express = require("express");
const router = express.Router();
const Category = require("../models/Category");



router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find()
      .select("name image")          
      .sort({ createdAt: -1 });

    res.json(categories);

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch categories",
      error: err.message
    });
  }
});

module.exports = router;