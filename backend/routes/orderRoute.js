const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  buyStock,
  sellStock,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/", getOrders);

router.post("/", createOrder);

router.put("/:id", updateOrder);

router.delete("/:id", deleteOrder);

router.post("/buy", protect, buyStock);

router.post("/sell", protect, sellStock);

module.exports = router;