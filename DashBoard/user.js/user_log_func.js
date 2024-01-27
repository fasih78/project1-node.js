const mongoose = require("mongoose");
const LogInfoModel = require("./log_info_model");
const moment = require("moment-timezone");
const requestIp= require ('request-ip');
const logRequestDetails = async (req, res, success = true) => {

  const clientIp = requestIp.getClientIp(req); 


  const user_id = req.headers.user_id;
  const url = req.url;
  const method = req.method;
  
  try {
    const user_info = await LogInfoModel.findOne({ user_id: user_id });

    // Create a new log entry
    const newLogEntry = new LogInfoModel({
      history: url,
      api_method: method,
      user_name: user_info?.user_name || "",
      user_id: user_info?.user_id || null,
      Time_In: moment().tz("Asia/Karachi").format("HH:mm:ss"),
      clientIp :clientIp,
      success: success,
    });

    // Save the log entry
    const savedLogEntry = await newLogEntry.save();

    console.log("Log entry saved successfully:", savedLogEntry);
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
