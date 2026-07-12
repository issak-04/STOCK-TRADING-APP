const Order = require("../models/orderSchema");
const Stock = require("../models/stockSchema");
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");
const Portfolio = require("../models/portfolioModel");

// Get All Orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("stock", "symbol companyName");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    res.status(201).json({
      message: "Order Created Successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Buy Stock
exports.buyStock = async (req, res) => {
  try {
    const { stockId, quantity } = req.body;

    const stock = await Stock.findById(stockId);

    if (!stock) {
      return res.status(404).json({
        message: "Stock Not Found",
      });
    }

    if (stock.availableQuantity < quantity) {
      return res.status(400).json({
        message: "Not Enough Stock Available",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    const totalPrice = stock.price * quantity;

    if (user.balance < totalPrice) {
      return res.status(400).json({
        message: "Insufficient Balance",
      });
    }

    // Deduct Balance
    user.balance -= totalPrice;
    await user.save();

    // Reduce Stock Quantity
    stock.availableQuantity -= quantity;
    await stock.save();

    // Update Portfolio
    let portfolio = await Portfolio.findOne({
      user: user._id,
      stock: stock._id,
    });

    if (!portfolio) {
      portfolio = await Portfolio.create({
        user: user._id,
        stock: stock._id,
        quantity,
        averagePrice: stock.price,
      });
    } else {
      const totalCost =
        portfolio.quantity * portfolio.averagePrice +
        quantity * stock.price;

      portfolio.quantity += quantity;
      portfolio.averagePrice = totalCost / portfolio.quantity;

      await portfolio.save();
    }

    // Create BUY Order
    const order = await Order.create({
      user: user._id,
      stock: stock._id,
      orderType: "BUY",
      quantity,
      price: stock.price,
      status: "COMPLETED",
    });

    // Create BUY Transaction
    await Transaction.create({
      user: user._id,
      stock: stock._id,
      type: "BUY",
      quantity,
      price: totalPrice,
    });

    res.status(201).json({
      message: "Stock Purchased Successfully",
      order,
      remainingBalance: user.balance,
      remainingStock: stock.availableQuantity,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Sell Stock
exports.sellStock = async (req, res) => {
  try {
    const { stockId, quantity } = req.body;

    const stock = await Stock.findById(stockId);

    if (!stock) {
      return res.status(404).json({
        message: "Stock Not Found",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    const portfolio = await Portfolio.findOne({
      user: user._id,
      stock: stock._id,
    });

    if (!portfolio) {
      return res.status(400).json({
        message: "You don't own this stock",
      });
    }

    if (portfolio.quantity < quantity) {
      return res.status(400).json({
        message: "Not enough shares to sell",
      });
    }

    const totalAmount = stock.price * quantity;

    // Increase Wallet Balance
    user.balance += totalAmount;
    await user.save();

    // Increase Available Stock
    stock.availableQuantity += quantity;
    await stock.save();

    // Update Portfolio
    portfolio.quantity -= quantity;

    if (portfolio.quantity === 0) {
      await Portfolio.findByIdAndDelete(portfolio._id);
    } else {
      await portfolio.save();
    }

    // Create SELL Order
    const order = await Order.create({
      user: user._id,
      stock: stock._id,
      orderType: "SELL",
      quantity,
      price: stock.price,
      status: "COMPLETED",
    });

    // Create SELL Transaction
    await Transaction.create({
      user: user._id,
      stock: stock._id,
      type: "SELL",
      quantity,
      price: totalAmount,
    });

    res.status(200).json({
      message: "Stock Sold Successfully",
      order,
      remainingBalance: user.balance,
      remainingStock: stock.availableQuantity,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Order
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Order Updated Successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.json({
      message: "Order Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};