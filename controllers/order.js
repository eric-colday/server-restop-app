import Order from "../models/Order.js";
import Stripe from "stripe";
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//create a order
export const createOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    console.log(savedOrder);
    res.status(200).json(savedOrder);
  } catch (err) {
    next(err);
  }
};

export const paymentSheet = async (req, res, next) => {
  try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(req.body.amount * 100),
        currency: "eur",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.status(200).json({
        paymentIntent: paymentIntent.client_secret
      });
  } catch (err) {
    next(err);
  }
};

//get user orders
export const getOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({ usedId: req.params.usedId });
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

//Update a order
export const updatedOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

//delete a order
export const deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted");
  } catch (err) {
    next(err);
  }
};

//get all orders
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};
