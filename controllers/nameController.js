// controllers/nameController.js
const axios = require("axios");
const Fintech = require("../models/fintechModel");
const { BASE_URL } = require("../services/nibssServices");

exports.nameEnquiry = async (req, res) => {
  const { accountNumber } = req.params;

  const fintech = await Fintech.findOne();

  const response = await axios.get(
    `${BASE_URL}/account/name-enquiry/${accountNumber}`,
    {
      headers: { Authorization: `Bearer ${fintech.token}` }
    }
  );

  res.json(response.data);
};