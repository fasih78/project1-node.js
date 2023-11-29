const express = require("express");
const CityModel = require("./citymodel.js");

const createCity = async (req, res) => {
  const { name } = req.body;

  const LastUser = await CityModel.findOne().sort({ _id: -1 }).exec();

  try {
    const id = LastUser ? LastUser.id + 1 : 1;
    let city = await CityModel.create({
      id,
      name,
    });
    await city.save();
    res.status(200).send({ message: "City has been Created!" });
    return;
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const cityUpdatebyidHandler = async (req, res) => {
  let { name } = req.body;
  const id = { _id: req.params.id };
  try {
    const upadatebyid = await CityModel.findByIdAndUpdate(id, {
      name,
    });
    if (name) {
      const upadatebyid = await CityModel.findByIdAndUpdate(id, {
        name,
      });
      res.status(200).send({ message: "City has been Updated!" });
      return;
    } else {
      res.status(400).send({ message: "Body require a Value!!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const cityDeleteAll = async (res) => {
  try {
    let query = {};
    const findall = await CityModel.find();
    if (findall == 0) {
      res.status(404).send({ message: "No Record in Database!" });
      return;
    } else {
      const cityDelete = await CityModel.deleteMany({}).exec();
      res.status(200).send({ message: "All city Deleted Sucessfully!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const cityDeleteOne = async (req, res) => {
  let id = { _id: req.params.id };

  // console.log("sds"+deleteone);
  try {
    const deleteone = await CityModel.findByIdAndDelete(id).exec();
    if (deleteone === null) {
      res.status(404).send({ message: "Record not found!" });
      return;
    } else {
      res.status(200).send({ message: "Deleted Sucessfully!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const cityFindAll = async (res) => {
  try {
    const findall = await CityModel.find().exec();
    res.status(200).send({ findall });
    return;
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const cityFindOne = async (req, res) => {
  let id = { _id: req.params.id };
  try {
    const cityfind = await CityModel.findOne(id).exec();
    if (cityfind === null) {
      res.status(404).send({ message: "Record not Found!" });
      return;
    } else {
      res.status(200).send({ cityfind });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  createCity,
  cityUpdatebyidHandler,
  cityDeleteAll,
  cityDeleteOne,
  cityFindAll,
  cityFindOne,
};
