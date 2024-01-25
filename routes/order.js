import express from "express";
import {
  createOrder,
  getAllOrders,
  paymentSheet,
} from "../controllers/order.js";

const router = express.Router();

//@route   POST api/orders
router.post("/", createOrder);

router.post("/create-intent", paymentSheet)

// @route   GET api/orders
router.get("/", getAllOrders);



export default router;
