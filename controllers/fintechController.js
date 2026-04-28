const axios = require("axios");
const Fintech = require("../models/fintechModel");
const { loginToNibss } = require("../services/nibssServices");
const { BASE_URL } = require("../config/nibssConfig");

exports.onboardFintech = async (req, res) => {
  try {
    const { name, email } = req.body;

    const response = await axios.post(
      `${BASE_URL}/fintech/onboard`,
      { name, email }
    );

    const { apiKey, apiSecret, bankCode, bankName } = response.data;

    // ✅ Get token immediately
    const token = await loginToNibss(apiKey, apiSecret);

    // ✅ Save ONLY ONCE
    const fintech = await Fintech.create({
      ...response.data,
      token,
      bankName: bankName || "Unknown Bank", // fallback if bankName is not provided
      bankCode: bankCode || "Unknown Code"  // fallback if bankCode is not provided
    });

    res.status(201).json({
      fintech: {
        name: fintech.name,
        email: fintech.email,
        bankCode: fintech.bankCode,
        bankName: fintech.bankName
      },
      token: fintech.token
  });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};