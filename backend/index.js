const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./routes/userRoute");
const connectDB = require("./config/db");
const stockRoutes = require("./routes/stockRoute");
const transactionRoutes = require("./routes/transactionRoute");
const orderRoutes = require("./routes/orderRoute");
const portfolioRoutes = require("./routes/portfolioRoute");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.get("/", (req, res) => {
  res.send("🚀 SB Stocks Backend is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});