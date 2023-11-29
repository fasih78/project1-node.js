const routes = require("express").Router();
const verifyUserToken = require("../Authorized");
const {
  CreatePayment,
  FindAllPayment,
  PaymentUpdatebyIdHandler,
  PaymentDeleteAll,
  PaymentDeleteOne,
  PaymentFindById,
} = require("./paymentservice.js");

//const myMiddleware = require("../Authorized.js");
//const express = require("express");
//  const router = express.Router();
//  router.use(myMiddleware);

routes.post("/payment", verifyUserToken, async (req, res) => {
  await CreatePayment(req, res);
});

routes.post("/findpayment", verifyUserToken, async (req, res) => {
  await FindAllPayment(req,res);
});

routes.put("/paymentupdatebyid/:id", verifyUserToken, async (req, res) => {
  await PaymentUpdatebyIdHandler(req, res);
});

routes.delete("/deleteall/payment", verifyUserToken, async (req, res) => {
  await PaymentDeleteAll(res);
});

routes.delete("/paymentdeleteone/:id", verifyUserToken, async (req, res) => {
  await PaymentDeleteOne(req, res);
});
routes.post("/paymentfindone/:id", verifyUserToken, async (req, res) => {
  await PaymentFindById(req, res);
});

module.exports = routes;
