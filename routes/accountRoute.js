const express = require("express");
const router = express.Router();
const { createAccount, getBalance } = require("../controllers/accountController");
const { protect } = require("../middleware/authMiddleware");

router.post("/create", protect, createAccount);
router.get("/balance/:accountNumber", protect, getBalance);

module.exports = router;