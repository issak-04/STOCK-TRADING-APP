const express = require("express");

const {
  getStocks,
  addStock,
  updateStock,
  deleteStock,
} = require("../controllers/stockController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Public Route
router.get("/", getStocks);

// Admin Only Routes
router.post("/", protect, admin, addStock);

router.put("/:id", protect, admin, updateStock);

router.delete("/:id", protect, admin, deleteStock);

module.exports = router;