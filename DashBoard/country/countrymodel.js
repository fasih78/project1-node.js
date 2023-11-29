const mongoose = require("mongoose");

const countryCore = {
  id: { type: Number, default: 1 },
  name: { type: String, required: true, required_error: "country is required" },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
};
const CountryModel = mongoose.model("COUNTRY", countryCore);
module.exports = CountryModel;
