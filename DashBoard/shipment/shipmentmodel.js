const mongoose = require("mongoose");
const PaymentModel = require("../payment/paymentmodel.js");
const ContractModel = require("../contract/contractmodel.js");

const ShipmentCore = new mongoose.Schema({
  id: { type: Number, default: 1 },
  shipmentdate: { type: Date, default: Date.now() },
  shipmentmethod: { type: String, required: true },
  contract: { type: mongoose.Schema.ObjectId, ref: ContractModel },
  payment: { type: mongoose.Schema.ObjectId, ref: PaymentModel },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const ShipmentModel = mongoose.model("SHIPMENT", ShipmentCore);
module.exports = ShipmentModel;
