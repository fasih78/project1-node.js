const mongoose = require("mongoose");

const brandCore = new mongoose.Schema({
  id: { type: Number, default: 1 },
  name: { type: String,required:true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const BrandModel = mongoose.model('BRAND', brandCore);
module.exports = BrandModel;
