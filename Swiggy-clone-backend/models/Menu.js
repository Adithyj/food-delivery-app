const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  name: String,
  price: Number,
  description: String,
  image: String,
  isVeg: Boolean
});

module.exports = mongoose.model("Menu", MenuSchema);