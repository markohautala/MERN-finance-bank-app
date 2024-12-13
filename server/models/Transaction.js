import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const TransactionSchema = new Schema(
  {
    buyer: {
      type: String,
      required: true,
    },
    amount: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100  // This is a getter that converts the value to USD
    },
    productIds: [  // This is an array of transaction IDs
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
  ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

const Transaction = mongoose.model("Transaction", TransactionSchema)

export default Transaction;