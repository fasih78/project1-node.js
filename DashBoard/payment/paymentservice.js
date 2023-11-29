const express = require("express");
const PaymentModel = require("./paymentmodel.js");
const moment = require("moment");
const CustomerModel = require("../customers/customermodel.js");
const { default: mongoose } = require("mongoose");
const ContractModel = require("../contract/contractmodel.js");
const StateModel = require("../state/statemodel.js");
const CountryModel = require("../country/countrymodel.js");
const CityModel = require("../city/citymodel.js");
const ProductModel = require("../product/productmodel.js");

const CreatePayment = async (req, res) => {
  try {
    const LastUser = await PaymentModel.findOne().sort({ _id: -1 });
    const id = LastUser ? LastUser.id + 1 : 1;
    const { contract, paymentmethod, paymentrecievedate, product } = req.body;

    if (contract && paymentmethod && paymentrecievedate) {
      const exists = await PaymentModel.findOne({
        contract,
        isDeleted: false,
      }).exec();
      console.log(exists);
      if (exists == null) {
        const paymentrue = await ContractModel.findByIdAndUpdate(contract, {
          payment: true,
        });
        const producttrue =  await ProductModel.findByIdAndUpdate(product,{
          payment:true
        })
        if (paymentrue || producttrue) {
          const create1 = await PaymentModel.create({
            id,
            paymentmethod,
            paymentrecievedate: moment(paymentrecievedate).format("YYYY-MM-DD"),
            contract: new mongoose.Types.ObjectId(contract),
            product: new mongoose.Types.ObjectId(product),
          });
          await create1.save();
          res.status(201).send({
            message: "Payment of these Customer Received Sucessfully!",
          });
          return;
        } else {
          res.status(500).send({ message: "payment not received!" });
        }
      } else {
        res.status(404).send({ message: "payment already exists!" });
      }
    } else {
      res.status(404).send({ message: "All Fields are requires!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
const FindAllPayment = async (req, res) => {
  try {
    const { fromDate, toDate } = req.body;
    console.log(req.body);
    const filter_stage = {
      paymentrecievedate: {
        $gte: moment(fromDate).startOf("date").format("YYYY-MM-DD"),
        $lte: moment(toDate).endOf("date").format("YYYY-MM-DD"),
      },
    };
    console.log(filter_stage);

    const findpayment = await PaymentModel.find(filter_stage, {
      isDeleted: false,
    })

      .populate({
        path: "product",
        model: ProductModel,
      })
      .populate({
        path: "contract",
        model: ContractModel,
        populate: {
          path: "customer",
          model: CustomerModel,
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
        },
      });

    if (findpayment.length > 0) {
      res.status(200).send({ findpayment });
      return findpayment;
    } else {
      res.status(404).send({ error: "No payments found" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const PaymentUpdatebyIdHandler = async (req, res) => {
  let { customer, paymentmethod, product, contract } = req.body;
  const LastUser = await PaymentModel.findOne().sort({ _id: -1 });
  const id = LastUser ? LastUser.id + 1 : 1;
  const Id = { _id: req.params.id };
  try {
    const upadatebyid = await PaymentModel.findByIdAndUpdate(Id, {
      id,
      paymentmethod,
      paymentrecievedate: moment(paymentrecievedate).format("YYYY-MM-DD"),
      contract: new mongoose.Types.ObjectId(contract),
      product: new mongoose.Types.ObjectId(product),
    });
    console.log(upadatebyid);
    if (customer && paymentmethod) {
      res.status(201).send({ message: "Payment updated Sucessfully!" });
      return;
    } else {
      res.status(400).send({ message: "Body Require a Value!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const PaymentDeleteAll = async (res) => {
  try {
    let query = {};
    const findall = await PaymentModel.find();
    console.log(findall);
    if (findall == 0) {
      res.status(404).send({ message: "No Record in Database!" });
      return;
    } else {
      const paymentDelete = await PaymentModel.deleteMany({}).exec();
      res.status(200).send({ message: "All Record Deleted Sucessfully!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const PaymentDeleteOne = async (req, res) => {
  let id = { _id: req.params.id };
  console.log(id);
  try {
    const payment = await PaymentModel.findById(id);
    const deleteone = await ContractModel.findByIdAndUpdate(payment?.contract, {
      payment: false,
    });
    const deleteone1 = await PaymentModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    console.log(deleteone);
    if (deleteone === null) {
      res.status(404).send({ message: "Record not found!" });
      return;
    } else {
      res.status(200).send({ message: "Payment has been Deleted!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const PaymentFindById = async (req, res) => {
  let id = { _id: req.params.id };
  try {
    const findbyid1 = await PaymentModel.findById(id).exec();
    if (findbyid1) {
      res.status(200).send({ findbyid1 });
      return;
    } else {
      res.status(404).send({ findbyid1 });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  CreatePayment,
  FindAllPayment,
  PaymentUpdatebyIdHandler,
  PaymentDeleteAll,
  PaymentDeleteOne,
  PaymentFindById,
};
