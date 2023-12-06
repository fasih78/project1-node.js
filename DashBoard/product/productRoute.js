const{CreateProduct,ProductFindOne,ProductDeleteOne,ProductDeleteAll,ProductUpdatebyIdHandler, ProductFindAll}=require('./productservice')
const verifyUserToken = require("../../middleware/Authorized");
const routes = require("express").Router();


routes.post("/product", verifyUserToken, async (req, res) => {
    await CreateProduct(req, res);
  });
  
  routes.post("/findproduct", verifyUserToken, async (req, res) => {
    await ProductFindAll(req,res);
  });
  
  routes.put("/productupdatebyid/:id", verifyUserToken, async (req, res) => {
    await ProductUpdatebyIdHandler(req, res);
  });
  
  routes.delete("/deleteall/product", verifyUserToken, async (req, res) => {
    await ProductDeleteAll(res);
  });
  
  routes.delete("/productdeleteone/:id", verifyUserToken, async (req, res) => {
    await ProductDeleteOne(req, res);
  });
  routes.post("/productfindone/:id", verifyUserToken, async (req, res) => {
    await ProductFindOne(req, res);
  });
  
  module.exports = routes;













