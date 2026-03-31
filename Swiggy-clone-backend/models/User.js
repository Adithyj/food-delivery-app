const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  otp: String,
  otpExpires: Date
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);