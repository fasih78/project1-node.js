const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  id: { type: Number, default: 1 },
  name: {
    type: String,
    required: true,
    required_error: "city name is required!",
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const CityModel = mongoose.model("CITY", citySchema);
module.exports = CityModel;
