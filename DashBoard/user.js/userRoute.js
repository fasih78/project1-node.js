const routes = require("express").Router();
const { response } = require("express");
const { SignUp, login, OtpVerify } = require("./userservice");
const verifyUserToken = require("../Authorized");

routes.post("/signup",  async (req, res) => {
  await SignUp(req, res);
});
routes.post("/login", async (req, res) => {
  await login(req, res);
});
routes.post("/verifyotp", async (req, res) => {
  await OtpVerify(req, res);
});
module.exports = routes;
