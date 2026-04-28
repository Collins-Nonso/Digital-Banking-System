const axios = require("axios");
const Account = require("../models/accountModel");
const Customer = require("../models/customerModel");
const Fintech = require("../models/fintechModel");
const { BASE_URL } = require("../config/nibssConfig");

exports.createAccount = async (req, res) => {
  try {
    const { kycType, kycID, dob } = req.body;

    if (!kycType || !kycID || !dob) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Create or fetch customer
    let customer = await Customer.findOne({ kycID });

    if (!customer) {
      customer = await Customer.create({ kycType, kycID, dob, firstName, lastName });
    }

    // ✅ Prevent duplicate account
    const existing = await Account.findOne({ customerId: customer._id });

    if (existing) {
      return res.status(409).json(existing);
    }

    const fintech = await Fintech.findOne();

    if (!fintech || !fintech.token) {
      return res.status(400).json({ message: "Fintech not authenticated" });
    }

    const response = await axios.post(
      `${BASE_URL}/api/account/create`,
      { kycType, kycID, dob },
      {
        headers: { Authorization: `Bearer ${fintech.token}` }
      }
    );

    const data = response.data.data || response.data;

    const accountNumber = data.accountNumber || data.account_number;
    const bankCode = data.bankCode || data.bank_code;
    const bankName = data.bankName || data.bank_name;

    if (!accountNumber) {
      return res.status(500).json({ error: "Invalid NIBSS response" });
    }

    // ✅ SAVE TO DB
    const account = await Account.create({
      customerId: customer._id,
      accountNumber,
      bankCode,
      bankName,
      balance: 15000
    });

    res.status(201).json({
      message: "Account created successfully",
      ...account._doc
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAccounts = async (req, res) => {
  const data = await Account.find().populate("customerId", "kycID");
  res.json(data);
};

exports.getBalance = async (req, res) => {
  const account = await Account.findOne({
    accountNumber: req.params.no
  });

  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  res.json({ balance: account.balance });
};