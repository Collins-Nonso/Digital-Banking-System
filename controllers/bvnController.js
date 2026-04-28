const axios = require("axios");
const Fintech = require("../models/fintechModel");
const { BASE_URL } = require("../config/nibssConfig");

// Insert BVN
exports.insertBvn = async (req, res) => {
  try {
    const { bvn, firstName, lastName, dob, phone } = req.body;

    const fintech = await Fintech.findOne();

    const response = await axios.post(
      `${BASE_URL}/insertBvn`,
      {
        bvn,
        firstName,
        lastName,
        dob,
        phone
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

// Validate BVN
exports.validateBvn = async (req, res) => {
  try {
    const { bvn } = req.body;

    const fintech = await Fintech.findOne();

    const response = await axios.post(
      `${BASE_URL}/validateBvn`,
      { bvn },
      {
        headers: { Authorization: `Bearer ${fintech.token}` }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};