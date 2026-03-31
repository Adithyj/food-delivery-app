const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: String,
  location: String,
  rating: Number,
  deliveryTime: String,
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    }
  ]
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);