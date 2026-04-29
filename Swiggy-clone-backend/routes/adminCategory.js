const express = require("express");
const router = express.Router();
const Category = require("../models/Category");



router.post("/admin/categories", async (req, res) => {
  try {
    const { name, image } = req.body;

    
    if (!name || !image) {
      return res.status(400).json({
        message: "Name and image URL are required"
      });
    }

    const newCategory = new Category({
      name,
      image
    });

    await newCategory.save();

    res.status(201).json(newCategory);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get("/admin/categories", async (req, res) => {
  try {
    const categories = await Category.find()
      .sort({ createdAt: -1 });

    res.json(categories);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.put("/admin/categories/:id", async (req, res) => {
  try {
    const { name, image } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

   
    if (name) category.name = name;
    if (image) category.image = image;

    await category.save();

    res.json(category);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.delete("/admin/categories/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    await category.deleteOne();

    res.json({ message: "Category deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;