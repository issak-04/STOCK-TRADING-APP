const Transaction = require("../models/transactionModel");

// Get All Transactions (Admin)
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("user", "name email")
      .populate("stock", "symbol companyName");

    res.json(transactions);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Logged-in User Transactions
exports.getMyTransactions = async (req, res) => {
  try {

    const transactions = await Transaction.find({
      user: req.user.id,
    }).populate("stock", "symbol companyName");

    res.json(transactions);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Add Transaction
exports.addTransaction = async (req, res) => {
  try {

    const transaction = await Transaction.create(req.body);

    res.status(201).json({
      message: "Transaction Successful",
      transaction,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};