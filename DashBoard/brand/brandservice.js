const express = require("express");
const BrandModel = require("./brandmodel");

const createbrand = async (req, res) => {
  let { name } = req.body;

  try {
    const LastUser = await BrandModel.findOne().sort({ _id: -1 }).exec();
    const id = LastUser ? LastUser.id + 1 : 1;
    const create = await BrandModel.create({
      id,
      name,
    });
    await create.save();
    res.status(200).send({ message: "Brand has been Created!" });
    return;
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const BrandUpdatebyIdHandler = async (req, res) => {
  let { name } = req.body;
  const id = { _id: req.params.id };
  console.log(id);
  try {
    const upadatebyid = await BrandModel.findByIdAndUpdate(id, {
      name,
    });
    if (name) {
      res.status(201).send({ message: "Brand updated Sucessfully!" });
      return;
    } else {
      res.status(400).send({ message: "Body Require a Value!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const BrandDeleteAll = async (res) => {
  try {
    let query = {};
    const findall = await BrandModel.find();
    if (findall == 0) {
      res.status(404).send({ message: "No Record in Database!" });
      return;
    } else {
      const brandDelete = await BrandModel.deleteMany({}).exec();
      res.status(200).send({ message: "All Record Deleted Sucessfully!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const BrandDeleteOne = async (req, res) => {
  let id = { _id: req.params.id };
  try {
    const deleteone = await BrandModel.findByIdAndDelete(id).exec();
    console.log(deleteone);
    if (deleteone === null) {
      res.status(404).send({ message: "Record not found!" });
      return;
    } else {
      res.status(200).send({ message: "Brand has been Deleted!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const BrandFindAll = async (res) => {
  try {
    const findall = await BrandModel.find().exec();
    for(i=0;i<findall.length;i++){
console.log(findall[2].name);
    }
    //const findss= findall.name;
    //console.log(findss);
    if (findall) {
      res.status(200).send({data:{ findall} ,sucess:true });
      return;
    } else {
      res.status(404).send({ findall });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const BrandFindOne = async (req, res) => {
  let id = { _id: req.params.id };

  try {
    const brandfind = await BrandModel.findOne(id).exec();
    if (brandfind === null) {
      res.status(404).send({ message: "Invalid id!" });
      return;
    } else {
      res.status(200).send({ brandfind });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  createbrand,
  BrandUpdatebyIdHandler,
  BrandDeleteAll,
  BrandDeleteOne,
  BrandFindAll,
  BrandFindOne,
};
