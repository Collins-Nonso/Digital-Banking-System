// routes/customerRoute.js
const express = require("express");
const router = express.Router();
const { verifyCustomer } = require("../controllers/customerController");

router.post("/verify", verifyCustomer);

module.exports = router;