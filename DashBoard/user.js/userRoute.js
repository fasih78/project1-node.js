const routes = require("express").Router();
const { response } = require("express");
const session = require('express-session');
const {
  SignUp,
  login,
  OtpVerify,
  Logout,
  terminal_histroy,
  Reset_password,
} = require("./userservice");
const { LoghistroyClear } = require("./user_log_func.js");
const verifyUserToken = require("../../middleware/Authorized");


routes.use(session({
  secret: 'FMS-1',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));

routes.post("/signup", async (req, res) => {
  await SignUp(req, res);
});
routes.post("/login", async (req, res) => {
  await login(req, res);
});
routes.post("/logout/:id", verifyUserToken, async (req, res) => {
  await Logout(req, res);
});
routes.post("/verifyotp", async (req, res) => {
  await OtpVerify(req, res);
});
routes.get("/terminal", async (req, res) => {
  await terminal_histroy(req, res);
});
routes.delete("/userhistroy", async (req, res) => {
  await LoghistroyClear(req, res);
});
routes.post("/resetpassword", async (req, res) => {
  await Reset_password(req, res);
});

module.exports = routes;
