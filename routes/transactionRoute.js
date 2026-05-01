// routes/transactionRoute.js
const express = require("express");
const router = express.Router();
const { transfer } = require("../controllers/transferController");

router.post("/transfer", transfer);

module.exports = router;
