const routes = require("express").Router();
const verifyUserToken = require("../Authorized");

const {
  createShipment,
  ShipmentUpdateById,
  ShipmentDeleteAll,
  ShipmentDeleteOne,
  ShipmentFindAll,
  ShipmentFindOne,
} = require("./shipmentservice.js");

routes.post("/shipment", verifyUserToken, async (req, res) => {
  await createShipment(req, res);
});

routes.put("/shipmentupdatebyid/:id", verifyUserToken, async (req, res) => {
  await ShipmentUpdateById(req, res);
});
routes.delete("/shipmentdeleteall", verifyUserToken, async (req, res) => {
  await ShipmentDeleteAll(res);
});

routes.delete("/shipmentdeleteone/:id", verifyUserToken, async (req, res) => {
  await ShipmentDeleteOne(req, res);
});

routes.post("/shipmentfindall", verifyUserToken, async (req, res) => {
  await ShipmentFindAll(req, res);
});

routes.post("/shipmentfindone/:id", verifyUserToken, async (req, res) => {
  await ShipmentFindOne(req, res);
});

module.exports = routes;
