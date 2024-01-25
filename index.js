import Stripe from "stripe";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import orderRoute from "./routes/order.js";
import mongoose from "mongoose";

const app = express();
dotenv.config({ path: "./.env" });

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO); 
    console.log("Connected to mongoDB."); 
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("error", (err) => {
  console.log("mongoDB error!", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

/** MIDDLEWEARE */
app.use(express.json());
app.use(cookieParser());
app.use(cors()); 


app.use("/api/orders", orderRoute); 

app.get("/api/test",(req, res) => {
  console.log("Hello World");
    res.send("Hello World");
});

/** SERVER */
app.listen(5500, () => {
  connect();
  console.log("Connected to backend.");
});
