const express = require("express");
const router = express.Router();
const User = require("../models/User");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

router.post("/check-user", async (req, res) => {
  try {
    const { phone } = req.body;

    const user = await User.findOne({ phone });

    if (user) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



router.post("/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp =  otpGenerator.generate(6, {
  upperCaseAlphabets: false,
  lowerCaseAlphabets: false,
  specialChars: false,
});

    user.otp = otp;
    user.otpExpires = Date.now() + 1 * 60 * 1000; 

    await user.save();
    const transporter = nodemailer.createTransport({
    service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.pass
  },
});

let info = {
  from: process.env.user,
  to: user.email,
  subject: "Your OTP for Swiggy",
  text: `Your OTP is ${otp}`,
}
await transporter.sendMail(info).then((info) => {
  res.json({ message: "OTP sent" });
}).catch((err) => {
  console.log(err);
  res.status(500).json({ message: "Failed to send OTP" });
});

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



router.post("/verify-otp", async (req, res) => {
  try {
    const { phone, otp } = req.body;
    console.log(phone, otp);
    const user = await User.findOne({ phone });

    if (!user) {
      return res.json({ success: false });
    }

    if (user.otp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.otpExpires < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }

   
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({ success: false });
  }
});


router.post("/signup", async (req, res) => {
  try {
    const { phone, name, email } = req.body;

    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ phone, name, email });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;