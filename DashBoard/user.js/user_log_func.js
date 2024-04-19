const mongoose = require("mongoose");
const LogInfoModel = require("./log_info_model");
const moment = require("moment-timezone");
const requestIp= require ('request-ip');
const fs = require("fs");

const session = require ('express-session');
const UserModel = require("./usermodel");





const logRequestDetails = async (req, res, success = true) => {

  const clientIp = requestIp.getClientIp(req); 

const user_Id = req.session.user_id
console.log(`this  is user_id :${user_Id}`)
  // const user_id = req.headers.user_Id;
  const url = req.url;
  const method = req.method;
  
  try {
    const user_info = await UserModel.findOne({ _id:new mongoose.Types.ObjectId(user_Id) });

  if(user_info !==  null || user_info !==  undefined){
    const newLogEntry = new LogInfoModel({
      history: url,
      api_method: method,
      user_name: user_info?.name || "",
      // user_id: user_info?.user_id || null,
      user_id: user_Id,
      Time_In: moment().tz("Asia/Karachi").format("HH:mm:ss"),
      clientIp :clientIp,
      success: success,
    });
    const savedLogEntry = await newLogEntry.save();
    const file = fs.appendFile('test.txt', JSON.stringify(newLogEntry, null, 2), (err) => {

      if (err) {
        console.error('Error appending to file:', err);
      } else {
        console.log('Data appended to file successfully.');
      }
    });
  }else{
    console.log("user_id not reterived!")
  }

  } catch (error) {
    console.error("Error saving log entry:", error);
  }
};

const LoghistroyClear = async (req, res) => {
  try {
    const deleteall = await LogInfoModel.deleteMany({}).exec();

    return res
      .status(200)
      .send({ message: "Deleted Sucesssfully!", deleteall });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {logRequestDetails,LoghistroyClear};
