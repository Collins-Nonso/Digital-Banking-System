const axios = require("axios");
const Fintech = require("../models/fintechModel");
const { BASE_URL } = require("../config/nibssConfig");

exports.getTransactionStatus = async (req, res) => {
    
  const { id } = req.params;

  const fintech = await Fintech.findOne();

  const response = await axios.get(
    `${BASE_URL}/transaction/${id}`,
    {
      headers: { Authorization: `Bearer ${fintech.token}` }
    }
  );

  res.json(response.data);
};