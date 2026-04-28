const axios = require("axios");
const Fintech = require("../models/fintechModel");
const { BASE_URL } = require("../config/nibssConfig");

exports.getBalance = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const fintech = await Fintech.findOne();

    const response = await axios.get(
      `${BASE_URL}/account/balance/${accountNumber}`,
      {
        headers: { Authorization: `Bearer ${fintech.token}` }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};