const mongoose = require("mongoose");

let Customer = new mongoose.Schema({
  id: { type: Number, default: 1 },
  name: { type: String },
  title: { type: String },
  contact: { type: String },
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  zipcode: { type: String },
  saletaxreg: { type: String },
  country_id: { type: mongoose.Schema.ObjectId, required: true },
  city_id: { type: mongoose.Schema.ObjectId, required: true },
  state_id: { type: mongoose.Schema.ObjectId, required: true },
  Date: { type: Date, default: Date.now() },
  ntn: { type: String },
  payment: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});
let CustomerModel = mongoose.model("CUSTOMER", Customer);
module.exports = CustomerModel;
