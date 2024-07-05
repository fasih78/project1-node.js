const CityModel = require("../city/citymodel.js");
const CountryModel = require("../country/countrymodel.js");
const CustomerModel = require("../customers/customermodel.js");
const ProductModel = require("../product/productmodel.js");
const StateModel = require("../state/statemodel.js");
const OrderModel = require("./ordermodel.js");
// require("dotenv").config();
// const dotenv = require("dotenv").config();
process.dotenv;
const stripe = require("stripe")(process.env.STRIPE_SCEREAT_KEY);
const stripeToken = process.env.STRIPE_PUBLISHED_KEY;
const bodyParser = require("body-parser");
const moment = require("moment");



const createOrder = async (req, res) => {
  try {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      order_date,
      product_quantity,
      product,
      customer,
      payment_method,
      card_no,
      currency,
    } = req.body;

    // Fetch product details
    const productInfo = await ProductModel.findOne({ _id: product });
    if (!productInfo) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Calculate total amount
    const totalAmount = productInfo.amount * product_quantity;

    // Fetch customer details
    const customerInfo = await CustomerModel.findOne({ _id: customer });
    if (!customerInfo) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Fetch address details
    const [state, city, country] = await Promise.all([
      StateModel.findOne({ _id: customerInfo.state_id }),
      CityModel.findOne({ _id: customerInfo.city_id }),
      CountryModel.findOne({ _id: customerInfo.country_id }),
    ]);

    // Create customer in Stripe
    const stripeCustomer = await stripe.customers.create({
      description: "Customer for orders",
      name: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone_no,
      address: {
        line1: customerInfo.address,
        city: city.name,
        state: state.name,
        country: country.name,
      },
    });

    // Create payment method in Stripe
    const stripePaymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: card_no,
        // Add other card details here
      },
    });

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: currency,
      payment_method: stripePaymentMethod.id,
      customer: stripeCustomer.id,
      description: `Order ID: ${order._id}`,
    });

    // Confirm payment intent
    const paymentIntentConfirmation = await stripe.paymentIntents.confirm(
      paymentIntent.id,
      { return_url: 'https://example.com/payment_success' }
    );

    // Update order status
    const paymentStatus = await OrderModel.findByIdAndUpdate(
      { _id: order._id },
      { payment: true }
    );

    return res.status(200).json({
      message: "Order placed successfully and payment completed!",
      order: paymentStatus,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const OrderDeleteAll = async (req, res) => {
  try {
    const deleteall = await OrderModel.deleteMany({});
    res.status(200).send({ message: "order delete sucessfully!" });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};


const Payment_get_stripe = async(req,res)=>{

  const paymentIntentId = req.params.id;
  console.log(paymentIntentId);
  
  try {
    const getOne = await stripe.paymentIntents.retrieve(paymentIntentId);
    return res.status(200).send({ getOne });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

const Payment_Refund_stripe =async (req,res)=>{
  const chargeId = req.params.id;
  console.log(chargeId);
  
  try {
    const refundPolicy = await stripe.refunds.create({
      charge: chargeId,
    });
  
    return res.status(200).send({ refundPolicy });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
  
}






module.exports = { createOrder, OrderDeleteAll,Payment_get_stripe,Payment_Refund_stripe };
