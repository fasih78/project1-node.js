const express = require("express");
const CurrencyModel = require("./currencymodel.js");
const moment=  require ('moment')

const createCurrency = async (req, res) => {
  let = { name,date } = req.body;
  const LastUser = await CurrencyModel.findOne().sort({ _id: -1 }).exec();
  try {
    const id = LastUser ? LastUser.id + 1 : 1;
    let create = await CurrencyModel.create({
      id,
      name,
      date:moment(date).format('YYYY-MM-DD'),
    });
    await create.save();
    res.status(200).send({ message: "Currency has been Created!" });
    return;
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const CurrencyUpdatebyIdHandler = async (req, res) => {
  let { name } = req.body;
  const id = { _id: req.params.id };
  try {
    const upadatebyid = await CurrencyModel.findByIdAndUpdate(id, {
      name,
    });
    if (name) {
      res.status(200).send({ message: "Currency has been Updated!" });
      return;
    } else {
      res.status(202).send({ message: "Body require a Value!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const CurrencyDeleteAll = async (res) => {
  try {
    let query = {};
    const currencyDelete = await CurrencyModel.deleteMany({}).exec();
    res.status(201).send({ message: "All Currency Deleted!" });
    return;
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const CurrencyDeleteOne = async (req, res) => {
  let id = { _id: req.params.id };
  try {
    const deleteone = await CurrencyModel.deleteOne(id).exec();
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

const CurrencyFindAll = async (res) => {
  try {
    const findall = await CurrencyModel.find().exec();
    res.status(200).send({ findall });
    return;
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const CurrencyFindOne = async (req, res) => {
  let id = { _id: req.params.id };
  try {
    const currencyfind = await CurrencyModel.findOne(id).exec();
    console.log(currencyfind);
    if (currencyfind === null) {
      res.status(404).send({ message: "Record not found" });
      return;
    } else {
      res.status(200).send({ currencyfind });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  createCurrency,
  CurrencyUpdatebyIdHandler,
  CurrencyDeleteAll,
  CurrencyDeleteOne,
  CurrencyFindAll,
  CurrencyFindOne,
};
