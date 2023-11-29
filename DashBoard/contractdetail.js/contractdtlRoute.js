const routes = require("express").Router();

const {
  ContractDtlCreate,
  ContractDtlUpdateById,
  ContractDtlFindAll,
  ContractdtlFindOne,
  ContractDtlDeleteOne,
  ContractDtlDeleteAll,
  Calrateqty,
} = require("./contractdtlservice.js");

routes.post("/contractdtl", async (req, res) => {
  await ContractDtlCreate(req, res);
});
routes.put("/contractdtlupdate/:id", async (req, res) => {
  await ContractDtlUpdateById(req, res);
});
routes.post("/contractdtlfindall", async (req, res) => {
  await ContractDtlFindAll(res);
});
routes.delete("/dtldeleteone/:id", async (req, res) => {
  await ContractDtlDeleteOne(req, res);
});
routes.delete("/contractdtldeleteall", async (req, res) => {
  await ContractDtlDeleteAll(res);
});
routes.post("/contractdtlfindone/:id", async (req, res) => {
  await ContractdtlFindOne(req, res);
});
routes.post("/calculateamount/:id", async (req, res) => {
  await Calrateqty(req, res);
});
module.exports = routes;
