const express = require("express");
const InvoiceModel = require("./invoicemodel.js");
const mongoose = require("mongoose");
const moment = require("moment");
const ContractModel = require("../contract/contractmodel.js");
const CustomerModel = require("../customers/customermodel.js");
const StateModel = require("../state/statemodel.js");
const CountryModel = require("../country/countrymodel.js");
const CityModel = require("../city/citymodel.js");

const InvoiceCreate = async (req, res) => {
  try {
    const { saletaxinvoiceno, invoicedate, contract } = req.body;
    const LastUser = await InvoiceModel.findOne().sort({ _id: -1 }).exec();
    const id = LastUser ? LastUser.id + 1 : 1;
    const exists = await InvoiceModel.findOne({
      contract,
      isDeleted: false,
    }).exec();
    console.log(exists);

    if (exists == null) {
      const invoicetrue = await ContractModel.findByIdAndUpdate(contract, {
        invoice: true,
      });
      if (invoicetrue) {
        const create = await InvoiceModel.create({
          id,
          contract: new mongoose.Types.ObjectId(contract),
          saletaxinvoiceno,
          invoicedate: moment(invoicedate).format("YYYY-MM-DD"),
        });
        await create.save();

        res.status(201).send({ message: "invoice created sucessfully!" });
        return;
      } else {
        res.status(404).send({ message: "contract not found!" });
      }
    } else {
      res
        .status(404)
        .send
        ({ message: "invoice of this contract already exists!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const InvoiceUpdateById = async (req, res) => {
  try {
    const { saletaxinvoiceno, invoicedate, contract } = req.body;

    const id = { _id: req.params.id };
    if (saletaxinvoiceno && invoicedate && contract) {
      const updatebyid = await InvoiceModel.findByIdAndUpdate(id, {
        saletaxinvoiceno: saletaxinvoiceno,
        invoicedate: invoicedate,
        contract: contract,
      });
      res.status(200).send({ message: "updated sucessfully!" });
      return;
    } else {
      res.status(400).send({ message: "Body require a value!" });
    }
    return;
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const InvoiceDeleteOne = async (req, res) => {
  try {
    const id = { _id: req.params.id };

    const invoice = await InvoiceModel.findById(id);

    const deleteone = await ContractModel.findByIdAndUpdate(invoice?.contract, {
      invoice: false,
    });
    const deletedtrue = await InvoiceModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    res.status(200).send({ message: "invoice deleted sucessfully!" });

    return;
  } catch (err) {
    res.status(500).send({ erorr: err.message });
  }
};

const InvoiceDeleteAll = async (res) => {
  try {
    let query = {};
    const findall = await InvoiceModel.find();
    console.log(findall);
    if (findall == 0) {
      res.status(404).send({ message: "No Record in Database!" });
      return;
    } else {
      const paymentDelete = await InvoiceModel.deleteMany({}).exec();
      res.status(200).send({ message: "All Record Deleted Sucessfully!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const InvoicFindOne = async (req, res) => {
  try {
    const id = { _id: req.params.id };
    console.log(id);
    const invoicefind = await InvoiceModel.find(id, {
      isDeleted: false,
    }).populate({
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
    console.log(invoicefind);
    if (invoicefind.length > 0) {
      res.status(200).send({ invoicefind });
      return invoicefind;
    } else {
      res.status(404).send({ error: "No invoice found" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const InvoiceFindAll = async (req, res) => {
  try {
    const { fromDate, toDate } = req.body;
    console.log(req.body);
    const invoicefindall = await InvoiceModel.aggregate([
      {
        $match: {
          isDeleted: false,
          invoicedate: {
            $gte: moment(fromDate).startOf("date").toDate(),
            $lte: moment(toDate).endOf("date").toDate(),
          },
        },
      },
      {
        $unwind: "$contract",
      },
      {
        $lookup: {
          from: "contracts",
          localField: "contract",
          foreignField: "_id",
          as: "contract",

          pipeline: [
            {
              $lookup: {
                from: "customers",
                localField: "customer",
                foreignField: "_id",
                as: "customer",
                pipeline: [
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
                      from: "countries",
                      localField: "country_id",
                      foreignField: "_id",
                      as: "country",
                    },
                  },
                  {
                    $lookup: {
                      from: "states",
                      localField: "state_id",
                      foreignField: "_id",
                      as: "states",
                    },
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "shipments",
                localField: "_id",
                foreignField: "contract",
                as: "shipment",
              },
            },
            {
              $lookup: {
                from: "payments",
                localField: "_id",
                foreignField: "contract",
                as: "payment",
              },
            },
          ],
        },
      },
    ]);
    // console.log({data:JSON.stringify(invoicefindall)});
    return res.status(200).send({ invoicefindall });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  InvoiceCreate,
  InvoiceUpdateById,
  InvoiceDeleteOne,
  InvoiceDeleteAll,
  InvoicFindOne,
  InvoiceFindAll,
};
