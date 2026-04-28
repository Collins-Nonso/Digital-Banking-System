const Account = require("../models/accountModel");

exports.checkOwnership = async (req, res, next) => {
  const account = await Account.findOne({
    accountNumber: req.params.accountNumber,
    customerId: req.user.id
  });

  if (!account)
    return res.status(403).json({ message: "Access denied" });

  next();
};