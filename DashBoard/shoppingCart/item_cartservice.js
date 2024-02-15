const express = require("express");
const CartSchema = require("./item_cartmodel");
const product_cartmodel = require("./product_cartmodel");

const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const productDetails = await product_cartmodel.findById(productId);

    if (!productDetails) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await CartSchema.findOne();

    console.log(cart);
    if (!cart) {
      cart = new CartSchema({ items: [], subTotal: 0 });

      //    return res.json({ message: 'Cart has been emptied successfully', data: cart });
    }

    const indexFound = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );
    if (indexFound !== -1) {
      // Update quantity and total if product exists in the cart
      cart.items[indexFound].quantity += quantity;
      cart.items[indexFound].total =
        cart.items[indexFound].quantity * productDetails.price;
    } else {
      // Add new item to the cart
      cart.items.push({
        productId: productId,
        quantity: quantity,
        price: productDetails.price,
        total: parseInt(productDetails.price * quantity),
      });
    }

    cart.subTotal = cart.items
      .map((item) => item.total)
      .reduce((acc, next) => acc + next, 0);
    await cart.save();

    res.json({ message: "Item added to cart successfully", data: cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", err: err });
  }
};

const getCartItem = async (req, res) => {
  try {
 
    const ItemGet = await CartSchema.findOne();
    return res
      .status(200)
      .send({ message: "data sucessfully get!", data: ItemGet });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", err: err });
  }
};

module.exports = { addItemToCart, getCartItem };
