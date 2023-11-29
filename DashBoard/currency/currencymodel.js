const mongoose = require("mongoose");

const currencyCore = {
  id: { type: Number, default: 1 },
  name: {
    type: String,
    required: true,
    required_error: "currency is required",
  },
  date:{type:Date, default:Date.now()},
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
};

let CurrencyModel = mongoose.model("CURRENCY", currencyCore);
module.exports = CurrencyModel;
