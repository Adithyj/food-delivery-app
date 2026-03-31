const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const Menu = require("../models/Menu");

router.get("/restaurant/:id", async (req, res) => {
  try {

    const restaurant = await Restaurant.findById(req.params.id);

    const menu = await Menu.find({
      restaurant: req.params.id
    });

    res.json({
      restaurant,
      menu
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;