const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");


// ✅ CREATE RESTAURANT
router.post("/admin/restaurants", async (req, res) => {
  try {
    const {
      name,
      location,
      rating,
      deliveryTime,
      categories,
      image
    } = req.body;

    // 🔥 validation
    if (!name || !location || !image) {
      return res.status(400).json({
        message: "Name, location and image are required"
      });
    }

    // 🔥 handle categories safely (array expected)
    let categoryArray = [];

    if (categories) {
      if (Array.isArray(categories)) {
        categoryArray = categories;
      } else {
        // fallback if frontend still sends string
        try {
          categoryArray = JSON.parse(categories);
        } catch {
          return res.status(400).json({
            message: "Invalid categories format"
          });
        }
      }
    }

    const restaurant = new Restaurant({
      name,
      location,
      rating,
      deliveryTime,
      categories: categoryArray,
      image
    });

    await restaurant.save();

    res.status(201).json(restaurant);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET ALL RESTAURANTS
router.get("/admin/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
      .populate("categories", "name")
      .sort({ createdAt: -1 });

    res.json(restaurants);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ UPDATE RESTAURANT
router.put("/admin/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found"
      });
    }

    const {
      name,
      location,
      rating,
      deliveryTime,
      categories,
      image
    } = req.body;

    // 🔥 safe updates
    if (name) restaurant.name = name;
    if (location) restaurant.location = location;
    if (rating) restaurant.rating = rating;
    if (deliveryTime) restaurant.deliveryTime = deliveryTime;
    if (image) restaurant.image = image;

    // 🔥 categories handling
    if (categories !== undefined) {
      if (Array.isArray(categories)) {
        restaurant.categories = categories;
      } else {
        try {
          restaurant.categories = JSON.parse(categories);
        } catch {
          return res.status(400).json({
            message: "Invalid categories format"
          });
        }
      }
    }

    await restaurant.save();

    res.json(restaurant);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ DELETE RESTAURANT
router.delete("/admin/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found"
      });
    }

    await restaurant.deleteOne();

    res.json({ message: "Restaurant deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;