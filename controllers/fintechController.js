// controllers/fintechController.js
const axios = require("axios");
const Fintech = require("../models/fintechModel");
const { BASE_URL, loginToNibss } = require("../services/nibssServices");

exports.onboardFintech = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email required" });
    }

    // ✅ CALL NIBSS API
    const response = await axios.post(
      `${BASE_URL}/fintech/onboard`,
      {
        name,
        email
        // 👉 Add this if required by API
        // callbackUrl: "https://yourapp.com/webhook"
      }
    );

    const data = response.data;

    console.log("NIBSS RESPONSE:", data);

    // ✅ GET TOKEN
    const token = await loginToNibss(
      data.apiKey,
      data.apiSecret
    );

    // ✅ SAVE TO DB
    const fintech = await Fintech.create({
      name: data.name,
      email: data.email,
      apiKey: data.apiKey,
      apiSecret: data.apiSecret,
      bankCode: data.bankCode,
      bankName: data.bankName,
      token
    });

    res.status(201).json({
      message: "Fintech onboarded successfully",
      fintech
    });

  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);

    res.status(400).json({
      error: error.response?.data || error.message
    });
  }
};