const express = require("express");
const mongoose = require("mongoose");
const moment = require('moment-timezone');

const userCore = new mongoose.Schema({
  email: { type: String, required: true },
  id: { type: Number },
  name: { type: String },
  password: { type: String, required: true },
  phonenumber: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const UserModel = mongoose.model("USER", userCore);
module.exports = UserModel;
