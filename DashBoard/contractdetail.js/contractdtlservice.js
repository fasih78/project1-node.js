const express = require("express");
const ContractDtlModel = require("./contractdtlmodel.js");
const ContractModel = require("../contract/contractmodel.js");
const { mongo, default: mongoose } = require("mongoose");
const CustomerModel = require("../customers/customermodel.js");

const ContractDtlCreate = async (req, res) => {
  try {
    const { qty, rate, exchangerate, contract } = req.body;
    const LastUser = await ContractDtlModel.findOne().sort({ _id: -1 }).exec();
    const id = LastUser ? LastUser.id + 1 : 1;

    console.log(contract);
    if (id && qty && rate && exchangerate && contract) {
      const exists1 = await ContractDtlModel.findOne({
        contract,
        isDeleted: false,
      });
      console.log(exists1, "ff");
      if (exists1 == null) {
        const contractdtltrue = await ContractModel.findByIdAndUpdate(
          contract,
          {
            contractdtl: true,
          }
        );

        console.log(contractdtltrue, "deq");
        if (contractdtltrue) {
          const create = await ContractDtlModel.create({
            id,
            qty: qty,
            rate: rate,
            amount: qty * rate,
            exchangerate: exchangerate,
            contract: new mongoose.Types.ObjectId(contract),
          });

          await create.save();
          res.status(201).send({
            sucess: true,
            message: "Contract Detail Saved Sucessfully!",
          });
          return;
        } else {
          res
            .status(500)
            .send({ message: "Contractdtl not received!", sucess: false });
        }
      } else {
        res.status(404).send({
          message: "Contract Detail of This Contract Already Exists!",
          sucess: false,
        });
        return;
      }
    } else {
      res.status(400).send({ message: "Body Require a Value!", sucess: false });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const ContractDtlUpdateById = async (req, res) => {
  try {
    let { qty, rate, exchangerate, contract } = req.body;
    let id = req.params.id;

    if (qty && rate && exchangerate && contract) {
      const upadate = await ContractDtlModel.findByIdAndUpdate(id, {
        qty: qty,
        rate: rate,
        amount: qty * rate,
        exchangerate: exchangerate,
        contract: new mongoose.Types.ObjectId(contract),
      });

      res.status(200).send({ message: "Updated Sucessfully!" });
      return;
    } else {
      res.status(400).send({ message: "Body Require A Value!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const ContractDtlFindAll = async (res) => {
  try {
    const contractdtl = await ContractDtlModel.aggregate([
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
              },
            },
          ],
        },
      },
    ]);

    res.status(200).send({ contractdtl });
    return contractdtl;
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
const ContractdtlFindOne = async (req, res) => {
  try {
    let id = req.params.id;

    // const contractdtl1 = await ContractDtlModel.findOne(id).exec();
    //console.log(contractdtl1);

    const contractdtl = await ContractDtlModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
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
              },
            },
          ],
        },
      },
    ]);
    res.status(200).send({ contractdtl });
    return contractdtl;
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const ContractDtlDeleteOne = async (req, res) => {
  try {
    let id = { _id: req.params.id };

    const contractdtl = await ContractDtlModel.findOne(id).exec();

    if (contractdtl) {
      const deleteonedtl = await ContractDtlModel.findByIdAndUpdate(id, {
        isDeleted: true,
      }).exec();
      const contractdtltrue = await ContractModel.findByIdAndUpdate(
        contractdtl?.contract,
        {
          contractdtl: false,
        }
      );

      res.status(201).send({ message: "Deleted Sucessfully!" });
      return;
    } else {
      res.status(404).send({ message: "Not Found!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ erorr: err.message });
  }
};

const ContractDtlDeleteAll = async (res) => {
  try {
    const findcontactdtl = await ContractDtlModel.find().exec();
    if (findcontactdtl) {
      const deleteALL = await ContractDtlModel.deleteMany().exec();
      res.status(201).send({ message: "Deleted Sucessfully!" });
      return;
    } else {
      res.status(404).send({ message: "No Record in Database!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ erorr: err.message });
  }
};

const Calrateqty = async (req, res) => {
  try {
    let id = { _id: req.params.id };
    const dtlmodel = await ContractDtlModel.findById(id).exec();
    const count = await ContractDtlModel.countDocuments().exec();
    const cal = await ContractDtlModel.aggregate([
      { $match: { contract: dtlmodel?.contract } },
      {
        $group: {
          _id: "$contract",
          contract: { $first: "$contract" },
          amount: { $sum: "$amount" },
          qty: { $sum: "$qty" },
          rate: { $sum: "$rate" },
          count: { $count: {} },
        },
      },
    ]);
    console.log(dtlmodel.amount);
    let royalityamount = (dtlmodel.amount * 50) / 100;
    res
      .status(200)
      .send({ sucess: true, data: { cal, count, royalityamount } });
  } catch (err) {
    res.status(500).send({ erorr: err.message, sucess: false });
  }
};
a = {
  a: 2,
};
module.exports = {
  ContractDtlCreate,
  ContractDtlUpdateById,
  ContractDtlFindAll,
  ContractdtlFindOne,
  ContractDtlDeleteOne,
  ContractDtlDeleteAll,
  Calrateqty,
};
