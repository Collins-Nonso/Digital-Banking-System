const axios = require("axios");
const Fintech = require("../models/fintechModel");
const { BASE_URL } = require("../config/nibssConfig");

// Insert NIN
exports.insertNin = async (req, res) => {
  try {
    const { nin, firstName, lastName, dob } = req.body;

    const fintech = await Fintech.findOne();

    const response = await axios.post(
      `${BASE_URL}/insertNin`,
      {
        nin,
        firstName,
        lastName,
        dob
      },
      {
        headers: { Authorization: `Bearer ${fintech.token}` }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Validate NIN
exports.validateNin = async (req, res) => {
  try {
    const { nin } = req.body;

    const fintech = await Fintech.findOne();

    const response = await axios.post(
      `${BASE_URL}/validateNin`,
      { nin },
      {
        headers: { Authorization: `Bearer ${fintech.token}` }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};