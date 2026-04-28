const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const Category = require("../models/Category");


// ✅ GET RESTAURANTS (FILTER + SORT)
router.get("/restaurants", async (req, res) => {
  try {
    const { category, sort } = req.query;

    let query = {};
    let sortOption = {};

    // 🔥 CATEGORY FILTER
    if (category) {
      const cat = await Category.findOne({
        name: new RegExp(`^${category}$`, "i")
      });

      if (!cat) {
        return res.json([]);
      }

      query.categories = cat._id;
    }

    // 🔥 SORTING (DB LEVEL)
    if (sort === "rating") {
      sortOption.rating = -1; // highest first
    }

    if (sort === "delivery") {
      // ⚠️ assumes deliveryTime is numeric (recommended)
      sortOption.deliveryTime = 1; // fastest first
    }

    const restaurants = await Restaurant.find(query)
      .populate("categories", "name image")
      .select("name location rating deliveryTime image categories")
      .sort(sortOption);

    res.json(restaurants);

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch restaurants",
      error: err.message
    });
  }
});

module.exports = router;