const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const upload = require("../middlewares/upload");
const fs = require("fs");



router.post(
  "/admin/categories",
  upload.single("image"),
  async (req, res) => {
    try {
      const { name } = req.body;
      console.log(req.body)
      if (!req.file) {
        return res.status(400).json({ message: "Image required" });
      }

      const newCategory = new Category({
        name,
        image: req.file.path
      });

      await newCategory.save();
      res.json(newCategory);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);



router.get("/admin/categories", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.put(
  "/admin/categories/:id",
  upload.single("image"),
  async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      
      if (req.file) {
        if (category.image && fs.existsSync(category.image)) {
          fs.unlinkSync(category.image);
        }
        category.image = req.file.path;
      }

      category.name = req.body.name || category.name;

      await category.save();
      res.json(category);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);



router.delete("/admin/categories/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    
    if (category.image && fs.existsSync(category.image)) {
      fs.unlinkSync(category.image);
    }

    await category.deleteOne();
    res.json({ message: "Category deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;