const express = require("express");
const ContractModel = require("./contractmodel.js");
const moment = require("moment");
const { default: mongoose } = require("mongoose");
const CustomerModel = require("../customers/customermodel.js");
const StateModel = require("../state/statemodel.js");
const CountryModel = require("../country/countrymodel.js");
const CityModel = require("../city/citymodel.js");

const CreateContract = async (req, res) => {
  try {
    let { contractno, contractdate, customer } = req.body;
    const LastUser = await ContractModel.findOne().sort({ _id: -1 }).exec();
    const id = LastUser ? LastUser.id + 1 : 1;
    console.log(customer);
    if (contractno) {
      const exists = await ContractModel.findOne({ customer }).exec();
      console.log(exists);
      if (exists == null) {
        const create = await ContractModel.create({
          id,
          contractdate: moment(contractdate).format("YYYY-MM-DD"),
          contractno,
          customer,
        });
        await create.save();
        res.status(201).send({ message: "Contract Created Sucessfully!" });
        return;
      } else {
        res
          .status(404)
          .send({ message: " Contract of this Customer Already exists!" });
        return;
      }
    } else {
      res.status(400).send({ message: "Body Require a Value!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const ContractUpdateById = async (req, res) => {
  try {
    const { contractdate, contractno, contract_id } = req.body;
    const id = { _id: req.params.id };
    if (contractdate && contractno) {
      const update = await ContractModel.findByIdAndUpdate(id, {
        contractdate: moment(contractdate).format("YYYY-MM-DD"),
        contractno,
        contract_id,
      });
      res.status(200).send({ message: "Updated Sucessfully!" });
      return;
    } else {
      res.status(400).send({ message: "Body Require a Value!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const ContractFindAll = async (res) => {
  try {
    const findcontract = await ContractModel.find().populate({
      path: "customer",
      populate: [
        {
          path: "state_id",
          model: StateModel,
        },
        {
          path: "country_id",
          model: CountryModel,
        },
        {
          path: "city_id",
          model: CityModel,
        },
      ],
    });

    console.log(findcontract);

    if (findcontract) {
      res.status(200).send({ findcontract });
      return findcontract;
    } else {
      res.status(404).send({ error: "No contracts found" });
    }
  } catch (err) {
    console.error("Error populating contracts:", err);
    res.status(500).send({ error: err.message });
  }
};

const ContractDeleteOne = async (req, res) => {
  try {
    const id = { _id: req.params.id };
    const findone = await ContractModel.findById(id).exec();
    console.log(findone);
    if (findone) {
      const deleteone = await ContractModel.findByIdAndUpdate(id, {
        isDeleted: true,
      });
      res.status(200).send({ message: "Deleted Sucessfully!" });
      return;
    } else {
      res.status(404).send({ message: "Invalid Id!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const ContractDeleteAll = async (res) => {
  try {
    const findall = await ContractModel.find();
    console.log(findall);
    if (findall == 0) {
      res.status(404).send({ message: "No Record in Database!" });
      return;
    } else {
      const contractDelete = await ContractModel.deleteMany({}).exec();
      res.status(200).send({ message: "All Record Deleted Sucessfully!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const ContractFindOne = async (req, res) => {
  try {
    const id = { _id: req.params.id };
    console.log(id);
    const contractfind = await ContractModel.findOne(id).populate({
      path: "customer",
      model: CustomerModel,
      populate: [
        { path: "state_id", model: StateModel },
        { path: "city_id", model: CityModel },
        { path: "country_id", model: CountryModel },
      ],
    });
    res.status(200).send({ contractfind });

    // if (contractfind) {
    //   res.status(200).send({ contractfind });
    //   return;
    // } else {
    //   res.status(404).send({ contractfind });
    //   return;
    // }
  } catch (err) {
    res.status(500).send({ error: err.message });
    return;
  }
};

module.exports = {
  CreateContract,
  ContractUpdateById,
  ContractFindAll,
  ContractDeleteOne,
  ContractDeleteAll,
  ContractFindOne,
};
