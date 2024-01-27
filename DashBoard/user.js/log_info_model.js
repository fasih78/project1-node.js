const { MongoGridFSChunkError } = require('mongodb');
const mongoose = require('mongoose');
const moment = require('moment-timezone');


const log_info = new mongoose.Schema({
Date:{type:Date,default:new Date()},
Time_In:{type:String},
user_name:{type:String},
email:{type:String},
user_id:{type:mongoose.Schema.Types.ObjectId},
logout : {type:Boolean , default:false},
history:{type:String},
api_method:{type:String},
logout_date:{type:Date},
Time_out:{type:String},
clientIp:{type:String},
success:{type:Boolean}
})


const LogInfoModel = mongoose.model('LOGINFO',log_info)

module.exports= LogInfoModel