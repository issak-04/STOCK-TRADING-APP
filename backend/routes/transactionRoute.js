const express = require("express");

const {
  getTransactions,
  getMyTransactions,
  addTransaction,
} = require("../controllers/transactionController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// All Transactions
router.get("/", getTransactions);

// Logged-in User Transactions
router.get("/my", protect, getMyTransactions);

// Add Transaction
router.post("/", addTransaction);

module.exports = router;