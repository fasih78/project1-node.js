const mongoose = require("mongoose");
const ContractModel = require("../contract/contractmodel.js");

const InvoiceCore = new mongoose.Schema({
  id: { type: Number, default: 1 },
  saletaxinvoiceno: { type: Number, required: true },
  invoicedate: { type: Date, required: true },
  contract: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ContractModel,
    required: true,
  },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const InvoiceModel = mongoose.model("INVOICE", InvoiceCore);
module.exports = InvoiceModel;
