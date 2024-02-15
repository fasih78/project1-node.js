const routes = require("express").Router();

const {
  InvoiceCreate,
  InvoiceUpdateById,
  InvoiceDeleteOne,
  InvoiceDeleteAll,
  InvoicFindOne,
  InvoiceFindAll,
} = require("./invoiceservice.js");

routes.post("/invoice", async (req, res) => {
  await InvoiceCreate(req, res);
});
routes.put("/invoice/updatebyid/:id", async (req, res) => {
  await InvoiceUpdateById(req, res);
});
routes.delete("/invoice/deleteone/:id", async (req, res) => {
  await InvoiceDeleteOne(req, res);
});
routes.delete("/invoice/deleteall", async (req, res) => {
  await InvoiceDeleteAll(res);
});
routes.get("/invoice/findone/:id", async (req, res) => {
  await InvoicFindOne(req, res);
});
// routes.post("/invoice/findall", async (req, res) => {
//   await InvoiceFindAll(req,res);
// });
module.exports = routes;
