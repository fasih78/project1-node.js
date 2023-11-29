  const mongoose = require("mongoose");
const CustomerModel = require("../customers/customermodel");

const ContractCore = new mongoose.Schema({
  id: { type: Number, default: 1 },
  contractdate: { type: Date },
  contractno: { type: Number },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: CustomerModel,
  },
  shipment: { type: Boolean, default: false },
  invoice: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  contractdtl: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const ContractModel = mongoose.model("CONTRACT", ContractCore);
module.exports = ContractModel;
