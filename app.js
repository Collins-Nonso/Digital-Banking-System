// app.js
const express = require("express");
const app = express();

app.use(express.json());

// ✅ IMPORT ROUTES ONLY
const userRoutes = require("./routes/userRoute");
const accountRoutes = require("./routes/accountRoute");
const transactionRoutes = require("./routes/transactionRoute");
const nameRoutes = require("./routes/nameRoute");
const fintechRoutes = require("./routes/fintechRoute");

// ✅ USE ROUTERS
app.use("/api/users", userRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/name", nameRoutes);
app.use("/api/fintech", fintechRoutes);

module.exports = app;