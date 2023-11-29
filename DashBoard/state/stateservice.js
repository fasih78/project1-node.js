const express = require("express");
const StateModel = require("./statemodel.js");
const moment = require("moment");

const createState = async (req, res) => {
  let = { name } = req.body;
  const LastUser = await StateModel.findOne().sort({ _id: -1 }).exec();
  const date = new Date();
  // new Date().toString().match(/([A-Z]+[\+-][0-9]+)/)[1]

  try {
    const id = LastUser ? LastUser.id + 1 : 1;
    let create = await StateModel.create({
      id,
      name,
      date: moment(date).format("YYYY-MM-DD"),
    });
    await create.save();
    res.status(200).send({
      sucess: true,
      message: "State has been Created",
      data: { create },
    });
    return;
  } catch (err) {
    res.status(500).send({ sucess: false, error: err.message });
  }
  return res;
};

const StateUpdatebyIdHandler = async (req, res) => {
  let { name } = req.body;
  console.log(name);
  const id = { _id: req.params.id };
  console.log(id);
  try {
    if (name) {
      const upadatebyid = await StateModel.findByIdAndUpdate(id, {
        name,
      });
      res.status(201).send({
        sucess: true,
        message: "State has been Updated Sucessfully",
        data: { upadatebyid },
      });
      return;
    } else {
      res.status(400).send({ sucess: false, message: "Body Require a Value!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ sucess: false, error: err.message });
  }
};

const StateDeleteAll = async (res) => {
  try {
    let query = {};
    const stateDelete = await StateModel.deleteMany({}).exec();
    res
      .status(201)
      .send({ sucess: true, message: "States Sucessfully Deleted!" });
    return;
  } catch (err) {
    res.status(500).send({ sucess: false, error: err.message });
  }
};

const StateDeleteOne = async (req, res) => {
  let id = { _id: req.params.id };
  try {
    const deleteone = await StateModel.findByIdAndDelete(id).exec();
    if (deleteone === 0) {
      res.status(404).send({ sucess: false, message: "invalid id!" });
      return;
    } else {
      res
        .status(200)
        .send({ sucess: true, message: "State has been Deleted!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ sucess: false, error: err.message });
  }
};

const StateFindAll = async (res) => {
  try {
    const findall = await StateModel.find().exec();
    res.status(200).send({ sucess: true, data: { findall } });
    return;
  } catch (err) {
    res.status(500).send({ sucess: false, error: err.message });
  }
};

const StateFindOne = async (req, res) => {
  let id = { _id: req.params.id };
  try {
    const statefind = await StateModel.findOne(id).exec();
    console.log(statefind);
    if (statefind == 0) {
      res.status(404).send({ sucess: false, message: "Record not found!" });
      return;
    } else {
      res.status(200).send({ sucess: true, data: { statefind } });
    }
  } catch (err) {
    res.status(500).send({ sucess: false, error: err.message });
  }
};

module.exports = {
  createState,
  StateUpdatebyIdHandler,
  StateDeleteAll,
  StateDeleteOne,
  StateFindAll,
  StateFindOne,
};
