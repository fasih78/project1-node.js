const mongoose = require("mongoose");

const stateCore = new mongoose.Schema({
  id: { type: Number, default: 1 },
  name: { type: String, required: true, required_error: "state are required!" },
  date: { type: Date },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const StateModel = mongoose.model("STATE", stateCore);
module.exports = StateModel;
