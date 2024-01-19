const routes = require("express").Router();
const { response } = require("express");
const { SignUp, login, OtpVerify, Logout, terminal_histroy } = require("./userservice");
const verifyUserToken = require("../../middleware/Authorized");

routes.post("/signup", async (req, res) => {
  await SignUp(req, res);
});
routes.post("/login", async (req, res) => {
  await login(req, res);
});
routes.post("/logout/:id",verifyUserToken, async (req, res) => {
  await Logout(req, res);
});
routes.post("/verifyotp", async (req, res) => {
  await OtpVerify(req, res);
});
routes.get("/terminal", async (req, res) => {
  await terminal_histroy(req, res);
});

module.exports = routes;
