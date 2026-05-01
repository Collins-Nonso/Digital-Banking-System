// controllers/customerController.js
const axios = require("axios");
const Customer = require("../models/customerModel");
const Account = require("../models/accountModel");
const Fintech = require("../models/fintechModel");
const { BASE_URL } = require("../services/nibssServices");

exports.createCustomer = async (req, res) => {
  try {
    const { kycType, kycID, dob } = req.body;

    if (!kycType || !kycID || !dob ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ kycID });

    if (existingCustomer) {
      return res.status(409).json({ message: "Customer already exists" });
    }

    // Create customer
    const customer = await Customer.create({
      kycType,
      kycID,
      dob,
    });

    // Get fintech token
    const fintech = await Fintech.findOne();

    if (!fintech || !fintech.token) {
      return res.status(400).json({ message: "Fintech not authenticated" });
    }

    // Call NIBSS to create account
    const response = await axios.post(
      `${BASE_URL}/account/create`,
      {
        kycType,
        kycID,
        dob
      },
      {
        headers: { Authorization: `Bearer ${fintech.token}` }
      }
    );

    const { accountNumber, bankCode, bankName } = response.data;

    // Save account locally
    await Account.create({
      customerId: customer._id,
      accountNumber,
      bankCode,
      bankName,
      balance: 15000
    });

    // Return required response
    res.status(201).json({
      message: "Account created successfully",
      accountNumber,
      bankCode,
      bankName,
      balance: 15000
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};