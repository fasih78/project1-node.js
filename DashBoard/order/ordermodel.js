const mongoose = require ('mongoose');
const ProductModel = require('../product/productmodel');
const CustomerModel = require('../customers/customermodel');


const OrderSchema = new mongoose.Schema({

id:{type:Number , default:0},
order_date:{type:Date , default:Date.now()},
product_quantity:{type:Number},
product:{type:mongoose.Schema.ObjectId,ref:ProductModel , required:true},
customer:{type:mongoose.Schema.ObjectId,ref:CustomerModel,required:true},
payment:{type:Boolean,default:false},
payment_method :{type:String ,required:true},
card_no :{type:String,required:true},
currency:{type:String,required:true},
total_Amount:{type:Number}

})


const OrderModel = mongoose.model('OrderSummary', OrderSchema);

module.exports = OrderModel