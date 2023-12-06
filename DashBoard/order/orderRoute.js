const  {CreateOrder,OrderDeleteAll,Payment_get_stripe,Payment_Refund_stripe}  = require("./orderservice.js");
const routes = require("express").Router();
const verifyUserToken = require("../../middleware/Authorized");

routes.post("/order/place", async (req, res) => {
  await CreateOrder(req, res);
});


routes.delete("/order/deleteall", async (req, res) => {
    await OrderDeleteAll(req, res);
  });

  routes.get("/payment/getone/:id", async (req, res) => {
    await Payment_get_stripe(req, res);
  });

  routes.post("/payment/refund/:id", async (req, res) => {
    await Payment_Refund_stripe(req, res);
  });
module.exports = routes