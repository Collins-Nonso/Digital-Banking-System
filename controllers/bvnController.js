const BVN = require("../models/bvnModel");

exports.insertBvn = async (req, res) => {
  try {
    const { bvn, firstName, lastName, dob, phone } = req.body;

    const exists = await BVN.findOne({ bvn });

    if (exists) {
      return res.status(400).json({ message: "BVN already exists" });
    }

    const record = await BVN.create({
      user: req.user._id,
      bvn,
      firstName,
      lastName,
      dob,
      phone,
      status: "verified"
    });

    res.status(201).json(record);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.validateBvn = async (req, res) => {
  try {
    const { bvn } = req.body;

    const record = await BVN.findOne({ bvn });

    if (!record) {
      return res.json({ valid: false });
    }

    res.json({ valid: true, data: record });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};