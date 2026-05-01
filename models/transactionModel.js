// models/transactionModel.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    from: String,
    to: String,
    amount: Number,
    status: String,
    transactionId: String,
    type: { type: String, enum: ["intra", "inter"] },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Transaction", transactionSchema);