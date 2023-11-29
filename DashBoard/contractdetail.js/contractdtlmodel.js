const mongoose = require("mongoose");
const ContractModel = require("../contract/contractmodel");

const ContractDtlCore = new mongoose.Schema({
  id: { type: Number, default: 1 },
  qty: { type: Number },
  rate: { type: Number },
  amount: { type: Number },
  exchangerate: { type: Number },
  contract: { type: mongoose.Schema.Types.ObjectId, ref: ContractModel },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const ContractDtlModel = mongoose.model("CONTRACTDETAIL", ContractDtlCore);

module.exports = ContractDtlModel;
