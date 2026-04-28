const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");


// ✅ CREATE MENU ITEM
router.post("/admin/menu", async (req, res) => {
  try {
    const { restaurant, name, price, description, isVeg, image } = req.body;

    // 🔥 validation
    if (!restaurant || !name || !price || !image) {
      return res.status(400).json({
        message: "Restaurant, name, price and image are required"
      });
    }

    const newItem = new Menu({
      restaurant,
      name,
      price,
      description,
      isVeg,
      image
    });

    await newItem.save();

    res.status(201).json(newItem);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET ALL MENU ITEMS
router.get("/admin/menu", async (req, res) => {
  try {
    const items = await Menu.find()
      .populate("restaurant", "name")
      .sort({ createdAt: -1 });

    res.json(items);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ UPDATE MENU ITEM
router.put("/admin/menu/:id", async (req, res) => {
  try {
    const { restaurant, name, price, description, isVeg, image } = req.body;

    const item = await Menu.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Menu item not found"
      });
    }

    // 🔥 safe updates
    if (restaurant) item.restaurant = restaurant;
    if (name) item.name = name;
    if (price) item.price = price;
    if (description !== undefined) item.description = description;
    if (isVeg !== undefined) item.isVeg = isVeg;
    if (image) item.image = image;

    await item.save();

    res.json(item);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ DELETE MENU ITEM
router.delete("/admin/menu/:id", async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Menu item not found"
      });
    }

    await item.deleteOne();

    res.json({ message: "Menu item deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;