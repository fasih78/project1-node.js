//import CityModel from "../city/citymodel.js";
const express = require("express");
const CustomerModel = require("./customermodel.js");
const { findByIdAndUpdate } = require("./customermodel.js");
const moment = require("moment");
const { default: mongoose } = require("mongoose");
const connectdb = require("../db.js");
const ContractModel = require("../contract/contractmodel.js");

const customer = async (req, res) => {
  try {
    const object = await CustomerModel.find().exec();
    let Date1 = new Date();
    const LastUser = await CustomerModel.findOne().sort({ _id: -1 }).exec();

    const id = LastUser ? LastUser.id + 1 : 1;
    let {
      name,
      title,
      contact,
      phone,
      email,
      address,
      zipcode,
      saletaxreg,
      country_id,
      city_id,
      state_id,
      ntn,
    } = req.body;
    console.log(
      id,
      name,
      title,
      contact,
      phone,
      email,
      address,
      zipcode,
      saletaxreg,
      Date,
      ntn
    );

    if (
      id &&
      name &&
      title &&
      contact &&
      phone &&
      email &&
      address &&
      zipcode &&
      saletaxreg &&
      ntn
    ) {
      let create = await CustomerModel.create({
        id,
        name,
        title,
        contact,
        phone,
        email,
        address,
        zipcode,
        saletaxreg,
        country_id,
        city_id,
        state_id,

        Date1: moment(Date1).format("YYYY-MM-DD"),
        ntn,
      });
      await create.save();
      res.status(201).send({ message: "Customer Have Saved Sucessfully!" });
      return;
    } else {
      res.status(400).send({ message: "All Fields Are Required" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const CustomerDeleteALL = async (res) => {
  try {
    let query = {};
    const findall = await CustomerModel.find();
    console.log(findall);
    if (findall == 0) {
      res.status(404).send({ message: "NO Record in Database!" });
      return;
    } else {
      const deleteall = await CustomerModel.deleteMany({}).exec();
      res.status(201).send({ message: "All Record Deleted Sucessfully!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const CustomerDeleteById = async (req, res) => {
  try {
    let myquery = { _id: req.params.id };
    const DeleteById = await CustomerModel.findByIdAndUpdate(myquery, {
      isDeleted: true,
    }).exec();
    if (DeleteById == null) {
      res.status(404).send({ message: "no Record found!" });
      return;
    } else {
      res.status(200).send({ message: "Deleted Sucessfully!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const Customerfindall = async (res) => {
  try {
    const totalCount = await CustomerModel.countDocuments();
    const findallcustomer = await CustomerModel.aggregate([
      {
        $lookup: {
          from: "countries",
          localField: "country_id",
          foreignField: "_id",
          as: "country",
        },
      },
      {
        $lookup: {
          from: "cities",
          localField: "city_id",
          foreignField: "_id",
          as: "city",
        },
      },

      {
        $lookup: {
          from: "states",
          localField: "state_id",
          foreignField: "_id",
          as: "state",
        },
      },
    ]);
    console.log(findallcustomer);
    if (findallcustomer) {
      res.status(200).send({ findallcustomer, totalCount });
      return;
    } else {
      res.status(404).send({ findallcustomer });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const findCustomerByIdHandler = async (req, res) => {
  try {
    let myquery = { _id: req.params.id };

    const findCustomerById = await CustomerModel.findOne(myquery).exec();
    if (findCustomerById == 0) {
      res.status(404).send({ message: "no Record found!" });
      return;
    } else {
      res.status(200).send(findCustomerById);
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const updateCustomerByIdHandler = async (req, res) => {
  try {
    let = {
      name,
      title,
      contact,
      phone,
      email,
      address,
      zipcode,
      saletaxreg,
      ntn,
    } = req.body;
    if (
      name &&
      title &&
      contact &&
      phone &&
      email &&
      address &&
      zipcode &&
      saletaxreg &&
      ntn
    ) {
      const id = { _id: req.params.id };
      const updateCustomer = await CustomerModel.findByIdAndUpdate(id, {
        name,
        title,
        contact,
        phone,
        email,
        address,
        zipcode,
        saletaxreg,
        ntn,
      });
      res.status(200).send({ message: "updated sucessfully!" });
      return;
    } else {
      res.status(400).send({ message: "body require a Value!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  customer,
  CustomerDeleteALL,
  CustomerDeleteById,
  Customerfindall,
  findCustomerByIdHandler,
  updateCustomerByIdHandler,
};
