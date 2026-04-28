const axios = require("axios");
const Fintech = require("../models/fintechModel");
const Transaction = require("../models/transactionModel");
const { BASE_URL } = require("../config/nibssConfig");

exports.transfer = async (req, res) => {
  try {
    const { from, to, amount } = req.body;

    const fintech = await Fintech.findOne();

    const response = await axios.post(
      `${BASE_URL}/transfer`,
      { from, to, amount },
      {
        headers: { Authorization: `Bearer ${fintech.token}` }
      }
    );

    const tx = await Transaction.create({
      from,
      to,
      amount,
      transactionId: response.data.transactionId,
      status: response.data.status,
      type: "inter"
    });

    res.json(tx);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};