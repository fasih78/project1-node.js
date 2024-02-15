const express = require("express");
const PaymentModel = require("../payment/paymentmodel.js");
const ContractModel = require("../contract/contractmodel.js");
const CustomerModel = require("../customers/customermodel.js");
const StateModel = require("../state/statemodel.js");
//const CurrencyModel = require ("../currency/currencymodel.js");
const CityModel = require("../city/citymodel.js");
const CountryModel = require("../country/countrymodel.js");
const ShipmentModel = require("./shipmentmodel.js");
const moment = require("moment");
const { default: mongoose } = require("mongoose");

const createShipment = async (req, res) => {
  try {
    const LastUser = await ShipmentModel.findOne().sort({ _id: -1 });
    const id = LastUser ? LastUser.id + 1 : 1;
    const { shipmentmethod, shipmentdate, contract, payment } = req.body;

    if (contract && shipmentmethod && shipmentdate && payment) {
      const findcontract = await ContractModel.findById(contract).exec();
      const findpayment = await PaymentModel.findById(payment).exec();

      if (findcontract && findpayment) {
        const exists = await ShipmentModel.find({ contract, payment }).exec();
        console.log("exists" + exists);
        if (exists == 0) {
          const shipmenttrue = await ContractModel.findByIdAndUpdate(contract, {
            shipment: true,
          });
          if (shipmenttrue) {
            const create1 = await ShipmentModel.create({
              id,
              shipmentmethod,
              shipmentdate: moment(shipmentdate).format("YYYY-MM-DD"),
              contract: contract,
              payment: payment,
            });
            await create1.save();
            res.status(201).send({
              message: "Shipment of these Customer Received Sucessfully!",
              sucess: true,
              data: { create1 },
            });
            return;
          } else {
            res
              .status(500)
              .send({ message: "Shipment not received!", sucess: false });
          }
        } else {
          res
            .status(404)
            .send({ message: "Shipment already exists!", sucess: false });
        }
      } else {
        res.status(201).send({ message: "Shipment not found!", sucess: false });
      }
    } else {
      res
        .status(404)
        .send({ message: "All Fields are requires!", sucess: false });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message, sucess: false });
  }
};
const ShipmentUpdateById = async (req, res) => {
  try {
    let { shipmentmethod, shipmentdate, contract, payment } = req.body;
    const id = { _id: req.params.id };

    const updateshipment = await ShipmentModel.findByIdAndUpdate(id, {
      shipmentmethod,
      shipmentdate: moment(shipmentdate).format("YYYY-MM-DD"),
      contract,
      payment,
    });

    if (updateshipment) {
      res.status(201).send({
        message: "Shipment Update Sucessfully!",
        sucess: true,
        data: { updateshipment },
      });
      return;
    } else {
      res.status(400).send({ message: "Body Require A Value!", sucess: false });
      return;
    }
  } catch (err) {
    res.status(500).send({ sucess: false, error: err.message });
  }
};

const ShipmentDeleteAll = async (res) => {
  try {
    const findrecord = await ShipmentModel.find().exec();

    if (findrecord == 0) {
      const deleteall = await ShipmentModel.deleteMany({}).exec();
      res
        .status(200)
        .send({ message: "All Record Deleted Sucessfully!", sucess: true });
      return;
    } else {
      res
        .status(404)
        .send({ message: "No Record In Database!", sucess: false });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message, sucess: false });
  }
};

const ShipmentDeleteOne = async (req, res) => {
  try {
    const id = { _id: req.params.id };
    const shipment = await ShipmentModel.findOne(id).exec();

    const shipmenttrue = await ContractModel.findByIdAndUpdate(
      shipment?.contract,
      {
        shipment: false,
      }
    );
    const deletetrue = await ShipmentModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    if (shipmenttrue == 0 && deletetrue == 0) {
      res.status(404).send({ message: "Record not found!", sucess: false });
      return;
    } else {
      res
        .status(200)
        .send({ message: "Payment has been Deleted!", sucess: true });
      return;
    }
  } catch (error) {
    res.status(500).send({ error: err.message, sucess: false });
  }
};

const ShipmentFindAll = async (req, res) => {
  const { fromDate, toDate } = req.body;
  const pageOption = {
    page: parseInt(req.query.page),
    limit: 5,
  };

  const filter_stage = {
    shipmentdate: {
      $gte: moment(fromDate).startOf("date").format("YYYY-MM-DD"),
      $lte: moment(toDate).endOf("date").format("YYYY-MM-DD"),
    },
  };

  try {
    const totalCount = await ShipmentModel.countDocuments();
    const shipmentfind = await ShipmentModel.find(filter_stage, {
      isDeleted: false,
    })
      .skip(pageOption.page * pageOption.limit)
      .limit(pageOption.limit)

      .populate({
        path: "payment",
        model: PaymentModel,
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

    if (shipmentfind.length > 0) {
      const response = {
        currentPage: pageOption.page,
        pagelimit: pageOption.limit,
        totalItems: totalCount,

        shipments: shipmentfind,
      };
      res.status(200).send({ sucess: true, data: { response } });
      return response;
    } else {
      res.status(404).send({ error: "No Shipment found", sucess: false });
      return;
    }
  } catch (err) {
    
    res.status(500).send({ erorr: err.message, sucess: false });
  }
};

const ShipmentFindOne = async (req, res) => {
  try {
    let id = { _id: req.params.id };
    console.log(id);
    const shipmentfind = await ShipmentModel.findOne(id)
      .populate({
        path: "contract",
        model: ContractModel,
      })
      .populate({
        path: "payment",
        model: PaymentModel,
      });
    console.log(shipmentfind.length);
    if (shipmentfind.length > 0) {
      res.status(200).send({ sucess: true, data: { shipmentfind } });
      return shipmentfind;
    } else {
      res.status(404).send({ error: "No Shipment found", sucess: false });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message, sucess: false });
  }
};

module.exports = {
  createShipment,
  ShipmentUpdateById,
  ShipmentDeleteAll,
  ShipmentDeleteOne,
  ShipmentFindAll,
  ShipmentFindOne,
};
