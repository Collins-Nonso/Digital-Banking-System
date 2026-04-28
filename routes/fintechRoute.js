const express = require("express");
const router = express.Router();
const { onboardFintech } = require("../controllers/fintechController");

router.post("/fintech/onboard", onboardFintech);

module.exports = router;