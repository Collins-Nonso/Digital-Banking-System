const express = require("express");
const router = express.Router();
const { createAccount } = require("../controllers/accountController");
const { getBalance } = require("../controllers/balanceController");

router.post("/create", createAccount);
router.get("/balance/:accountNumber", getBalance);

module.exports = router;