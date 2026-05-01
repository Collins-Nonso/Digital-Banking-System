const axios = require("axios");
const Account = require("../models/accountModel");
const Customer = require("../models/customerModel");
const Fintech = require("../models/fintechModel");
const { BASE_URL } = require("../services/nibssServices");

exports.createAccount = async (req, res) => {
  try {
    const { kycType, kycID, dob } = req.body;

    if (!kycType || !kycID || !dob) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let customer = await Customer.findOne({ kycID });

    if (!customer) {
      customer = await Customer.create({
        kycType,
        kycID,
        dob
      });
    }

    const existing = await Account.findOne({ customerId: customer._id });

    if (existing) {
      return res.status(409).json({
        message: "Account already exists",
        account: existing
      });
    }

    const fintech = await Fintech.findOne();

    if (!fintech || !fintech.token) {
      return res.status(400).json({ message: "Fintech not authenticated" });
    }

    const response = await axios.post(
      `${BASE_URL}/account/create`,
      { kycType, kycID, dob },
      {
        headers: { Authorization: `Bearer ${fintech.token}` }
      }
    );

    const data = response.data.data || response.data;

    const account = await Account.create({
      customerId: customer._id,
      accountNumber: data.accountNumber,
      bankCode: data.bankCode,
      bankName: data.bankName,
      balance: 15000
    });

    res.status(201).json({
      message: "Account created successfully",
      account
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const account = await Account.findOne({
      accountNumber: req.params.accountNumber
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({ balance: account.balance });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};