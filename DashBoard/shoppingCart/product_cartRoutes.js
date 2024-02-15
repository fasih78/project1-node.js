const express = require("express");
const routes = express.Router();
const upload = require("../../middleware/multer_auth");
const { addItemToCart, getCartItem } = require("./item_cartservice");

const product = require("./product_cartService");
// const addItemToCart = require ('./item_cartservice')

routes.post("/shop", async (req, res) => {
  await product(req, res);
});

routes.post("/cart/additem", async (req, res) => {
  await addItemToCart(req, res);
});
routes.get("/get/cart/item", async (req, res) => {
  await getCartItem(req, res);
});

module.exports = routes;
