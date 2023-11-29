require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createPaymentIntent(amount, currency = "usd") {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      payment_method_types: ['card'],
    });

    return paymentIntent.client_secret; // This is the secret key to pass to the client for confirmation
  } catch (error) {
    console.error("Error creating PaymentIntent:", error.message);
    throw error;
  }
}

// Example: Create a PaymentIntent with an amount of 100 USD
const amountInCents = 10000; // 100 USD in cents
createPaymentIntent(amountInCents)
  .then((clientSecret) => {
    console.log("PaymentIntent created with client secret:", clientSecret);
  })
  .catch((error) => {
    // Handle the error
  });
