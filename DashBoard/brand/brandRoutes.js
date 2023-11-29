const routes = require("express").Router();
const verifyUserToken = require("../Authorized");
const {
  createbrand,
  BrandUpdatebyIdHandler,
  BrandDeleteAll,
  BrandDeleteOne,
  BrandFindAll,
  BrandFindOne,
} = require("./brandservice.js");

routes.post("/brand", verifyUserToken, async (req, res) => {
  await createbrand(req, res);
});

routes.put("/brandupdatebyid/:id", verifyUserToken, async (req, res) => {
  await BrandUpdatebyIdHandler(req, res);
});

routes.delete("/deleteall/brand", verifyUserToken, async (req, res) => {
  await BrandDeleteAll(res);
});

routes.delete("/branddeleteone/:id", verifyUserToken, async (req, res) => {
  await BrandDeleteOne(req, res);
});

routes.post("/getall/brand", verifyUserToken, async (req, res) => {
  await BrandFindAll(res);
});

routes.post("/brandfindone/:id", verifyUserToken, async (req, res) => {
  await BrandFindOne(req, res);
});

module.exports = routes;
