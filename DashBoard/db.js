const mongoose = require("mongoose");
// const dotenv = require("dotenv").config();
process.dotenv;


const connectdb = () => {
  mongoose.set("strictQuery", false);
  mongoose.set("debug", true);
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log("DATABASE INFO === CONNECTED  TO   FMS   ");
    })
    .catch((err) => {
      console.log(err);
    });
};



module.exports = connectdb;
