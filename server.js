const express = require("express");

//const app =express();
require("dotenv").config();
const connectdb = require("./DashBoard/db");
const app = require("./AppController");
const passport = require('passport');
const session = require('express-session');



app.listen(process.env.NODE_PORT, () => {
  console.log("Server is running on port: " + process.env.NODE_PORT);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // You can add additional error handling or graceful shutdown logic here
});

process.on("SIGINT", () => {
  console.log("Shutting down gracefully...");
  app.close(() => {
    console.log("Server has closed.");
    process.exit(0);
  });
});
///   Database Connection ////
connectdb();

module.exports;
