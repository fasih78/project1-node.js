const routes = require("express").Router();
const {
  createState,
  StateUpdatebyIdHandler,
  StateDeleteAll,
  StateDeleteOne,
  StateFindAll,
  StateFindOne,
} = require("./stateservice.js");
const verifyUserToken = require("../../middleware/Authorized");
const { response, json } = require("express");

routes.post("/state", verifyUserToken, async (req, res) => {
  await createState(req, res);
});

routes.put("/stateupdatebyid/:id", verifyUserToken, async (req, res) => {
  await StateUpdatebyIdHandler(req, res);
});

routes.delete("/deleteall/state", verifyUserToken, async (req, res) => {
  await StateDeleteAll(res);
});

routes.delete("/statedeleteone/:id", verifyUserToken, async (req, res) => {
  await StateDeleteOne(req, res);
});

routes.post("/getall/state", verifyUserToken, async (req, res) => {
  await StateFindAll(res);
});

routes.post("/statefindone/:id", verifyUserToken, async (req, res) => {
  await StateFindOne(req, res);
});

module.exports = routes;
