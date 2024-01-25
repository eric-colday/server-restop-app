import { Schema, model } from "mongoose";

const OrderSchema = new Schema(
  {
    products: [
      {
        productId: {
          type: String,
        },
        name: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },

      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object },
    status: { type: String, default: "not paid" },
    emailAddress: { type: Array, required: true },
  },
  { timestamps: true }
);

export default model("Order", OrderSchema);
