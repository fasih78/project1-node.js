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



const CreateOrder = async (req, res) => {
  try {
    const {
      order_date,
      product_quantity,
      product,
      customer,
      payment_method,
      card_no,
      currency,
    } = req.body;

    const product_amount = await ProductModel.findOne({ _id: product });
    const pamount = product_amount?.amount;
    const amount = pamount * product_quantity;
    const LastUser = await OrderModel.findOne().sort({ _id: -1 });
    const id = LastUser ? LastUser.id + 1 : 1;



    
    
    if (payment_method === "card") {
      const customerid = await CustomerModel.findOne({ _id: customer });
     
  const state = await StateModel.findOne({_id:customerid?.state_id})
  const city = await CityModel.findOne({_id:customerid?.city_id})
  const country = await CountryModel.findOne({_id:customerid?.country_id})

  ///create customer from stripe! 

      const Customer = await stripe.customers.create({
        description: "test",
        name: customerid?.name,
        email: customerid?.email,
        phone_no: customerid?.phone_no,
        address: {
          line1: customerid?.address, 
          line2: customerid?.address,
          city: city?.name,
          state: state?.name,
          country: country.name,
        },
      });
      // create payment intent from stripe!
  
      const paymentMethod = await stripe.paymentMethods.create({
        type: "card",
        card: {
           token: "tok_visa",
          //   number: '4242424242424242',
          //   exp_month: 12,
          //   exp_year: 2034,
          //   cvc: '314',
        },
      });

      const order = await OrderModel.create({
        id: id,
        order_date: moment(order_date).format("YYYY-MM-DD"),
        product_quantity: product_quantity,
        product: product,
        customer: customer,
        payment_method: payment_method,
        card_no: card_no,
        currency: currency,
        total_Amount: amount,
      });

      const customerId = Customer.id;
   
 // payment intent create with help of  customer payment method id!
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
        payment_method: paymentMethod.id,
        //  automatic_payment_methods: { enabled: true },
        customer: customerId,
        description: `Order_Id ${order._id}`,
     
      });
    
      // stripe another method of payment 

      // const Payment_Complete = await stripe.charges.create({
        //   amount: amount,
        //   currency: currency,
        //   description: `Order_Id ${order._id}`,
        // source:'tok_visa'
        // });
        
        if (paymentIntent) {
          const paymentIntentConfirmation = await stripe.paymentIntents.confirm(
            paymentIntent.id,
            {return_url: 'https://google.com'}
            
            );
            
            console.log("Payment Intent Confirmation:", paymentIntentConfirmation);
            const payment_status = await OrderModel.findByIdAndUpdate(
          { _id: order._id },
          { $set: { payment: true } }
        );

        return res.status(200).send({
          message: "Order was successfully placed, and payment was also done!",
        });
      } else {
        const order = await OrderModel.create({
          id: id,
          order_date: moment(order_date).format("YYYY-MM-DD"),
          product_quantity: product_quantity,
          product: product,
          customer: customer,
          payment_method: payment_method,
          card_no: card_no,
          currency: currency,
          total_Amount: amount,
          payment: false,
        });

        return res
          .status(200)
          .send({ message: "Order was successfully placed!" });
      }
    }
  } catch (err) {
    return res.status(500).send({ error: err.message });
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

module.exports = { CreateOrder, OrderDeleteAll };
