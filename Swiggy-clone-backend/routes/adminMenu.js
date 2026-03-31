const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");
const upload = require("../middlewares/upload");

router.post(
  "/admin/menu",
  upload.single("image"),
  async (req, res) => {
    try {

      const { restaurant, name, price, description, isVeg } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }

      const newItem = new Menu({
        restaurant,
        name,
        price,
        description,
        isVeg,
        image: req.file.path  
      });

      await newItem.save();

      res.json(newItem);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;