const  {CreateOrder,OrderDeleteAll}  = require("./orderservice.js");
const routes = require("express").Router();
const verifyUserToken = require("../Authorized");

routes.post("/order/place", async (req, res) => {
  await CreateOrder(req, res);
});


routes.delete("/order/deleteall", async (req, res) => {
    await OrderDeleteAll(req, res);
  });


module.exports = routes