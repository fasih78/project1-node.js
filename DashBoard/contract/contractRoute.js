const routes = require("express").Router();
const {
  CreateContract,
  ContractUpdateById,
  ContractFindAll,
  ContractDeleteOne,
  ContractDeleteAll,
  ContractFindOne,
} = require("./contractservice.js");

routes.post("/contract", async (req, res) => {
  await CreateContract(req, res);
});
routes.put("/contractupdate/:id", async (req, res) => {
  await ContractUpdateById(req, res);
  
});
routes.post("/contractfindall", async (req, res) => {
  await ContractFindAll(res);
});
routes.delete("/deleteone/:id", async (req, res) => {
  await ContractDeleteOne(req, res);
});
routes.delete("/contractdeleteall", async (req, res) => {
  await ContractDeleteAll(res);
});
routes.post("/contractfindone/:id", async (req, res) => {
  await ContractFindOne(req, res);
});
module.exports = routes;
