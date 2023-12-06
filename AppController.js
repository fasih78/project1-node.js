const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const rateLimitMiddleware = require('./middleware/Request_limit')

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
 app.use(rateLimitMiddleware)
app.use(bodyParser.urlencoded({ extended: true }));




const userRoute = require("./DashBoard/user.js/userRoute");

const customerRoute = require("./DashBoard/customers/customerRoute");

const cityRoute = require("./DashBoard/city/cityRoute");

const stateRoute = require("./DashBoard/state/stateRoute");

const countryRoute = require("./DashBoard/country/countryRoute");

const currencyRoute = require("./DashBoard/currency/currencyRoute");

const brandRoute = require("./DashBoard/brand/brandRoutes");

const paymentRoute = require("./DashBoard/payment/paymentRoute");

const contractRoute = require("./DashBoard/contract/contractRoute");

const shipmentRoute = require("./DashBoard/shipment/shipmentRoute");

const contractdtlRoute = require("./DashBoard/contractdetail.js/contractdtlRoute");

const filingRoute = require("./DashBoard/filesysytem.js/filingRoute");

const invoiceRoute = require("./DashBoard/invoice/invoiceRoute");

const productRoute = require("./DashBoard/product/productRoute.js");


const orderRoute = require ("./DashBoard/order/orderRoute.js")

////////////////////// User  Registration Address! /////////////

app.use("/", userRoute);

//////////////////// Customer  Api Address! ///////////////////

app.use("/", customerRoute);

///////////////////////// City Api Address ///////////////////

app.use("/", cityRoute);

////////////////////// State Api Address /////////////////////

app.use("/", stateRoute);

///////////////////// Country Api Address ///////////////////

app.use("/", countryRoute);

////////////////   Currency Api Address ////////////////////

app.use("/", currencyRoute);

///////////////   Brand  Api Address  //////////////////////

app.use("/", brandRoute);

//////////////  Payment Api Address  //////////////////////

app.use("/", paymentRoute);

//////////// Contract Api Address /////////////////////////

app.use("/", contractRoute);

/////////// Shipment Api Address ///////////////////////////

app.use("/", shipmentRoute);

//////////////// Contract Dtl /////////////////////////////

app.use("/", contractdtlRoute);

////////////  filing Route ////////////////////////////////

app.use("/", filingRoute);

///////////// Invoice Route ////////////////////////////////

app.use("/", invoiceRoute);

/////////////////// Product Route //////////////////////////

app.use("/", productRoute);

//////////////////// Order Route  /////////////////////////////


app.use("/", orderRoute) 


module.exports = app;
