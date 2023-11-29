const mongoose = require("mongoose");
const ContractModel = require("../contract/contractmodel");
const ProductModel = require("../product/productmodel");

const PaymentCore = new mongoose.Schema({
  id: { type: Number },
  product:{type:mongoose.Schema.ObjectId, ref:ProductModel},
  paymentrecievedate: { type: Date, default: Date.now() },
  contract: { type: mongoose.Schema.ObjectId, ref: ContractModel },
  paymentmethod: { type: String },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

// const PaymentReportCore = new mongoose.Schema({
//   FromDate: { type: Date },
//   toDate: { type: Date },
// });

const PaymentModel = mongoose.model("PAYMENT", PaymentCore);
//const PaymentReportSchema = PaymentReportCore
module.exports = PaymentModel;
