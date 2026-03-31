const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const Category = require("../models/Category");

router.get("/restaurants", async (req, res) => {
  try {
    const { category, sort } = req.query;

    let query = {};

    if (category) {
      const cat = await Category.findOne({
        name: new RegExp(`^${category}$`, "i")
      });

      if (cat) {
        query.categories = cat._id;
      } else {
        return res.json([]); // category not found
      }
    }

    let restaurants = await Restaurant.find(query).populate("categories");

    // sorting
    if (sort === "rating") {
      restaurants.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "delivery") {
      restaurants.sort(
        (a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime)
      );
    }

    res.json(restaurants);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;