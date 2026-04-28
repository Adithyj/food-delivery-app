const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const Menu = require("../models/Menu");


// ✅ GET RESTAURANT + MENU
router.get("/restaurant/:id", async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // 🔥 validate ID
    if (!restaurantId) {
      return res.status(400).json({
        message: "Restaurant ID required"
      });
    }

    // 🔥 fetch restaurant with categories
    const restaurant = await Restaurant.findById(restaurantId)
      .populate("categories", "name image");

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found"
      });
    }

    // 🔥 fetch menu items (only required fields)
    const menu = await Menu.find({
      restaurant: restaurantId
    })
      .select("name price image description isVeg")
      .sort({ createdAt: -1 });

    res.json({
      restaurant,
      menu
    });

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch restaurant data",
      error: err.message
    });
  }
});

module.exports = router;