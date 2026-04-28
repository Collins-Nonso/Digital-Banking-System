const express = require("express");
const router = express.Router();
const { nameEnquiry } = require("../controllers/nameController");

router.get("/name-enquiry/:accountNumber", nameEnquiry);

module.exports = router;