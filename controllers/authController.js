const Fintech = require("../models/fintechModel");
const { loginToNibss } = require("../services/nibssServices");

exports.getToken = async (req, res) => {
  try {
    const { apiKey, apiSecret } = req.body;

    if (!apiKey || !apiSecret) {
      return res.status(400).json({ message: "Credentials required" });
    }

    const token = await loginToNibss(apiKey, apiSecret);

    await Fintech.findOneAndUpdate(
      { apiKey },
      { token },
      { new: true }
    );

    res.json({ message: "Token retrieved", token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};