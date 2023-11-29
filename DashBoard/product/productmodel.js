const mongoose = require("mongoose");

const ProductCore = new mongoose.Schema({
  id: { type: Number, default: 0 },
  item: { type: String, required: true },
  amount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  currency:{type:mongoose.Schema.ObjectId,required:true},
  date: { type: Date, default: Date.now() },
  payment:{type:Boolean,default:false}
});

const ProductModel = mongoose.model("PRODUCT", ProductCore);
module.exports = ProductModel;
