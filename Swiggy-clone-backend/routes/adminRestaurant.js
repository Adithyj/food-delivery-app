const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const upload = require("../middlewares/upload");
const fs = require("fs");



router.post(
  "/admin/restaurants",
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, location, rating, deliveryTime, categories } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }

      const newRestaurant = new Restaurant({
        name,
        location,
        rating,
        deliveryTime,
        categories: categories ? JSON.parse(categories) : [],
        image: req.file.path
      });

      await newRestaurant.save();
      res.json(newRestaurant);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);



router.get("/admin/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
      .populate("categories");

    res.json(restaurants);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.put(
  "/admin/restaurants/:id",
  upload.single("image"),
  async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.id);

      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }

    
      if (req.file) {
        if (restaurant.image && fs.existsSync(restaurant.image)) {
          fs.unlinkSync(restaurant.image);
        }
        restaurant.image = req.file.path;
        console.log(restaurant.image);
      }

      restaurant.name = req.body.name || restaurant.name;
      restaurant.location = req.body.location || restaurant.location;
      restaurant.rating = req.body.rating || restaurant.rating;
      restaurant.deliveryTime = req.body.deliveryTime || restaurant.deliveryTime;

      if (req.body.categories) {
        restaurant.categories = JSON.parse(req.body.categories);
      }

      await restaurant.save();
      res.json(restaurant);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);



router.delete("/admin/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    
    if (restaurant.image && fs.existsSync(restaurant.image)) {
      fs.unlinkSync(restaurant.image);
    }

    await restaurant.deleteOne();

    res.json({ message: "Restaurant deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;