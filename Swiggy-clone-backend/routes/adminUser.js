const express = require("express");
const router = express.Router();
const User = require("../models/User");



router.get("/admin/users", async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 });

    res.json(users);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/admin/users", async (req, res) => {
  try {
    const { phone, name, email } = req.body;

    
    if (!phone || !name || !email) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({
        message: "Phone already exists"
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const newUser = new User({
      phone,
      name,
      email
    });

    await newUser.save();

    res.status(201).json(newUser);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.put("/admin/users/:id", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    
    if (email) {
      const emailExists = await User.findOne({
        email,
        _id: { $ne: req.params.id }
      });

      if (emailExists) {
        return res.status(400).json({
          message: "Email already in use"
        });
      }
    }

    
    if (phone) {
      const phoneExists = await User.findOne({
        phone,
        _id: { $ne: req.params.id }
      });

      if (phoneExists) {
        return res.status(400).json({
          message: "Phone already in use"
        });
      }
    }

    
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    await user.save();

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.delete("/admin/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    await user.deleteOne();

    res.json({ message: "User deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;