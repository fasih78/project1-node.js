const routes = require("express").Router();
const verifyUserToken = require("../../middleware/Authorized");
const ipMiddleware = require("../../middleware/Ip_Address.js");
const { logRequestDetails } = require("../user.js/user_log_func.js");

const {
  createcountry,
  CountryUpdatebyIdHandler,
  CountryDeleteAll,
  CountryDeleteOne,
  CountryFindAll,
  CountryFindOne,
} = require("./countryservice.js");

routes.post("/country", ipMiddleware, async (req, res) => {
  const country= await createcountry(req, res);

  if(!country){
    await logRequestDetails(req,res, true)
    return  res.status(200).send(country);
  }
  else {
    await logRequestDetails(req,res, false)
   return res.status(500).send({ error: err.message });
  }
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
