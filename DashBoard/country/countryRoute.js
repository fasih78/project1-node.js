const routes = require("express").Router();
const verifyUserToken = require("../Authorized");
const {
  createcountry,
  CountryUpdatebyIdHandler,
  CountryDeleteAll,
  CountryDeleteOne,
  CountryFindAll,
  CountryFindOne,
} = require("./countryservice.js");

routes.post("/country", verifyUserToken, async (req, res) => {
  await createcountry(req, res);
});

routes.put("/countryupdatebyid/:id", verifyUserToken, async (req, res) => {
  await CountryUpdatebyIdHandler(req, res);
});

routes.delete("/deleteall/country", verifyUserToken, async (req, res) => {
  await CountryDeleteAll(res);
});

routes.delete("/countrydeleteone/:id", verifyUserToken, async (req, res) => {
  await CountryDeleteOne(req, res);
});

routes.post("/getall/country", verifyUserToken, async (req, res) => {
  await CountryFindAll(res);
});

routes.post("/countryfindone/:id", verifyUserToken, async (req, res) => {
  await CountryFindOne(req, res);
});

module.exports = routes;
