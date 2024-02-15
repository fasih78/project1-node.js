const mongoose = require("mongoose");
const moment = require('moment')

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please include the product name"],
  },
  price: {
    type: Number,
    required: [true, "Please include the product price"],
  },
  filePath: String,
  public_id: { type: String, default: 0 },
  cloudinary_url: String,
  Date: { type: Date },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const ProductModel = mongoose.model("Product_Cart", ProductSchema);
module.exports = ProductModel;
