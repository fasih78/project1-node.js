const ProductModel = require("./productmodel.js");
const express = require("express");
const moment = require("moment");
const { default: mongoose } = require("mongoose");

const CreateProduct = async (req, res) => {
  try {
    const { item, amount, quantity, currency, date } = req.body;

    const LastUser = await ProductModel.findOne().sort({ _id: -1 });
    const id = LastUser ? LastUser.id + 1 : 1;
    const create = await ProductModel.create({
      id: id,
      item: item,
      amount: amount,
      quantity: quantity,
      currency: currency,
      date: moment(date).format("YYYY-MM-DD"),
    });
    await create.save();
    return res.status(200).send({ message: "Product create Sucessfully!" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
const ProductFindAll = async (res) => {
  try {
    const findall = await ProductModel.aggregate([
        {
            $lookup:{
                from:"currencies",
                localField:"currency",
                foreignField:"_id",
                as:"currency"
            }
        }
    ])
    if (findall) {
      res.status(200).send(findall);
      return;
    } else {
      res.status(404).send(findall);
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const ProductFindOne = async (req, res) => {
  let id = { _id: req.params.id };

  try {
    const countryfind = await ProductModel.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(id)
            }
        },
    {
        $lookup:{
            from:"currencies",
            localField:"currency",
            foreignField:"_id",
            as:"currency"
        }
    }
])
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
const ProductDeleteOne = async (req, res) => {
  let id = { _id: req.params.id };
  try {
    const deleteone = await ProductModel.findByIdAndDelete(id).exec();
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
const ProductDeleteAll = async (res) => {
  try {
    let query = {};
    const findall = await ProductModel.find();
    if (findall == 0) {
      res.status(404).send({ message: "No Record in Database!" });
      return;
    } else {
      const countryDelete = await ProductModel.deleteMany({}).exec();
      res.status(200).send({ message: "All Record Deleted Sucessfully!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const ProductUpdatebyIdHandler = async (req, res) => {
    const { item, amount, quantity, currency, date } = req.body;
    const id = { _id: req.params.id };
    console.log(id);
    try {
      const upadatebyid = await ProductModel.findByIdAndUpdate(id, {
        id: id,
        item: item,
        amount: amount,
        quantity: quantity,
        currency: currency,
        date: moment(date).format("YYYY-MM-DD"),
      });
      if (name) {
        res.status(201).send({ message: "product updated Sucessfully!" });
        return;
      } else {
        res.status(400).send({ message: "Body Require a Value!" });
        return;
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };



  module.exports={CreateProduct,ProductFindAll,ProductFindOne,ProductDeleteOne,ProductDeleteAll,ProductUpdatebyIdHandler}
  