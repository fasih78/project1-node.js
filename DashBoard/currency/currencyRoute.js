const routes = require("express").Router();
const verifyUserToken = require("../Authorized");
const {
  createCurrency,
  CurrencyUpdatebyIdHandler,
  CurrencyDeleteAll,
  CurrencyDeleteOne,
  CurrencyFindAll,
  CurrencyFindOne,
} = require("./currencyservice.js");

routes.post("/currency", verifyUserToken, async (req, res) => {
  await createCurrency(req, res);
});

routes.put("/currencyupdatebyid/:id", verifyUserToken, async (req, res) => {
  await CurrencyUpdatebyIdHandler(req, res);
});

routes.delete("/deleteall/currency", verifyUserToken, async (req, res) => {
  await CurrencyDeleteAll(res);
});

routes.delete("/currencydeleteone/:id", verifyUserToken, async (req, res) => {
  await CurrencyDeleteOne(req, res);
});

routes.post("/getall/currency", verifyUserToken, async (req, res) => {
  await CurrencyFindAll(res);
});

routes.post("/currencyfindone/:id", verifyUserToken, async (req, res) => {
  await CurrencyFindOne(req, res);
});

module.exports = routes;
