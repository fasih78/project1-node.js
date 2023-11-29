const routes = require("express").Router();
const jwt = require("jsonwebtoken");
//const { response } = require("express");
const {
  customer,
  CustomerDeleteById,
  Customerfindall,
  findCustomerByIdHandler,
  CustomerDeleteALL,
  updateCustomerByIdHandler,
} = require("./customerservice");
const verifyUserToken = require("../Authorized");
// const { CustomerDeleteALL } = require("./customerservice.js");
// const { Customerfindall } = require("./customerservice");
//const CustomerfindOne = require ("./customerservice.js")
//const express = require("express");

routes.post("/customer", verifyUserToken, async (req, res) => {
  await customer(req, res);
});

routes.delete("/deleteall", verifyUserToken, async (req, res) => {
  await CustomerDeleteALL(res);
});
routes.delete("/delete/:id", async (req, res) => {
  await CustomerDeleteById(req, res);
});

routes.post("/getall", verifyUserToken, async (req, res) => {
  await Customerfindall(res);
});

routes.post("/getone/:id", verifyUserToken, async (req, res) => {
  await findCustomerByIdHandler(req, res);
});

routes.put("/upadatebyid/:id", verifyUserToken, async (req, res) => {
  await updateCustomerByIdHandler(req, res);
});

module.exports = routes;
