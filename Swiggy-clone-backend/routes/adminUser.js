const express = require("express");
const router = express.Router();
const User = require("../models/User");



router.get("/admin/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/admin/users", async (req, res) => {
  try {
    const { phone, name, email } = req.body;

    const existing = await User.findOne({ phone });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      phone,
      name,
      email
    });

    await newUser.save();
    res.json(newUser);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/admin/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.json({ message: "User deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/admin/users/:id", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    
    const emailExists = await User.findOne({
      email,
      _id: { $ne: req.params.id }
    });

    if (emailExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    
    const phoneExists = await User.findOne({
      phone,
      _id: { $ne: req.params.id }
    });

    if (phoneExists) {
      return res.status(400).json({ message: "Phone already in use" });
    }

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;