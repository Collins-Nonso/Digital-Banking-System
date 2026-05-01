// routes/fintechRoute.js
const express = require("express");
const router = express.Router();
const { onboardFintech } = require("../controllers/fintechController");

router.post("/onboard", onboardFintech);

module.exports = router;