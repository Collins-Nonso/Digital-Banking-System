const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/fintech", require("./routes/fintechRoute"));
app.use("/api/account", require("./routes/accountRoute"));
app.use("/api/transaction", require("./routes/transactionRoute"));
app.use("/api/name", require("./routes/nameRoute"));

// controllers
const fintechController = require("./controllers/fintechController");
const customerController = require("./controllers/customerController");
const accountController = require("./controllers/accountController");
const transferController = require("./controllers/transferController");
const statusController = require("./controllers/statusController");
const nameController = require("./controllers/nameController");
const bvnController = require("./controllers/bvnController");
const ninController = require("./controllers/ninController");
const authController = require("./controllers/authController");

// routes (WITH HTTP METHODS)

// fintech onboarding
app.post("/api/fintech/onboard", fintechController.onboardFintech);

// auth
app.post("/api/auth/token", authController.getToken);

// customer
app.post("/api/account/create", customerController.createCustomer);

// name enquiry
app.get("/api/account/name-enquiry/:no", nameController.nameEnquiry);

// accounts
app.get("/api/accounts", accountController.getAccounts);

// balance
app.get("/api/account/balance/:no", accountController.getBalance);

// transfer
app.post("/api/transfer", transferController.transfer);

// transaction status
app.get("/api/transaction/:id", statusController.getTransactionStatus);

// BVN
app.post("/api/insertBvn", bvnController.insertBvn);
app.post("/api/validateBvn", bvnController.validateBvn);

// NIN
app.post("/api/insertNin", ninController.insertNin);
app.post("/api/validateNin", ninController.validateNin);

module.exports = app;