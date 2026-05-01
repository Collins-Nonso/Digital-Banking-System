// models/customerModel.js
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
      sparse: true // ✅ FIX duplicate null error
    },
    kycType: {
      type: String,
      enum: ["bvn", "nin"],
      required: true
    },
    kycID: {
      type: String,
      required: true,
      unique: true
    },
    dob: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);