const routes = require("express").Router();
const { create } = require("../user.js/usermodel");
const verifyUserToken = require("../Authorized");
//const { CustomerDeleteALL } = require("../customers/customerservice");
const {
  createCity,
  cityUpdatebyidHandler,
  cityDeleteAll,
  cityDeleteOne,
  cityFindAll,
  cityFindOne,
} = require("./cityservice");

routes.post("/city", verifyUserToken, async (req, res) => {
  console.log("res", res);
  await createCity(req, res);
});

routes.put("/cityupdatebyid/:id", verifyUserToken, async (req, res) => {
  await cityUpdatebyidHandler(req, res);
});

routes.delete("/deleteall/city", verifyUserToken, async (req, res) => {
  await cityDeleteAll(res);
});

routes.delete("/citydeleteone/:id", verifyUserToken, async (req, res) => {
  await cityDeleteOne(req, res);
});

routes.post("/getall/city", verifyUserToken, async (req, res) => {
  await cityFindAll(res);
});

routes.post("/findone/:id", verifyUserToken, async (req, res) => {
  await cityFindOne(req, res);
});

module.exports = routes;
