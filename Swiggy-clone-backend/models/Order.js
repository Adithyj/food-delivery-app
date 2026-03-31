const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true
  },

  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },

  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu"
      },
      name: String,
      price: Number,
      quantity: Number
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["Placed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"],
    default: "Placed"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Order", OrderSchema);