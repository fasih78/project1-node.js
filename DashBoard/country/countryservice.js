const express = require("express");
const CountryModel = require("./countrymodel");

const createcountry = async (req, res) => {
  let { name } = req.body;

  try {
    const LastUser = await CountryModel.findOne().sort({ _id: -1 }).exec();
    const id = LastUser ? LastUser.id + 1 : 1;
    const create = await CountryModel.create({
      id,
      name,
    });
    await create.save();
    res.status(200).send({ message: "Country has been Created!" });
    return;
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const CountryUpdatebyIdHandler = async (req, res) => {
  let { name } = req.body;
  const id = { _id: req.params.id };
  console.log(id);
  try {
    const upadatebyid = await CountryModel.findByIdAndUpdate(id, {
      name,
    });
    if (name) {
      res.status(201).send({ message: "Country updated Sucessfully!" });
      return;
    } else {
      res.status(400).send({ message: "Body Require a Value!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const CountryDeleteAll = async (res) => {
  try {
    let query = {};
    const findall = await CountryModel.find();
    if (findall == 0) {
      res.status(404).send({ message: "No Record in Database!" });
      return;
    } else {
      const countryDelete = await CountryModel.deleteMany({}).exec();
      res.status(200).send({ message: "All Record Deleted Sucessfully!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const CountryDeleteOne = async (req, res) => {
  let id = { _id: req.params.id };
  try {
    const deleteone = await CountryModel.findByIdAndDelete(id).exec();
    console.log(deleteone);
    if (deleteone === null) {
      res.status(404).send({ message: "Record not found!" });
      return;
    } else {
      res.status(200).send({ message: "Country has been Deleted!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const CountryFindAll = async (res) => {
  try {
    const findall = await CountryModel.find().exec();
    if (findall) {
      res.status(200).send({ findall });
      return;
    } else {
      res.status(404).send({ findall });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const CountryFindOne = async (req, res) => {
  let id = { _id: req.params.id };

  try {
    const countryfind = await CountryModel.findOne(id).exec();
    if (countryfind === null) {
      res.status(404).send({ message: "Invalid id!" });
      return;
    } else {
      res.status(200).send({ countryfind });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  createcountry,
  CountryUpdatebyIdHandler,
  CountryDeleteAll,
  CountryDeleteOne,
  CountryFindAll,
  CountryFindOne,
};
