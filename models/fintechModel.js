// models/fintechModel.js
const mongoose = require("mongoose");

const fintechSchema = new mongoose.Schema({
  name: String,
  email: String,
  apiKey: String,
  apiSecret: String,
  token: String,
});

module.exports = mongoose.model("Fintech", fintechSchema);