const NIN = require("../models/ninModel");

exports.insertNin = async (req, res) => {
  try {
    const { nin, firstName, lastName, dob } = req.body;

    const exists = await NIN.findOne({ nin });

    if (exists) {
      return res.status(400).json({ message: "NIN already exists" });
    }

    const record = await NIN.create({
      user: req.user._id,
      nin,
      firstName,
      lastName,
      dob
    });

    res.status(201).json(record);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.validateNin = async (req, res) => {
  try {
    const { nin } = req.body;

    const record = await NIN.findOne({ nin });

    if (!record) {
      return res.json({ valid: false });
    }

    res.json({ valid: true, data: record });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};