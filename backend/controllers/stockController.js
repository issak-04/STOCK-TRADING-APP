const Stock = require("../models/stockSchema");

// Get All Stocks
exports.getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add New Stock
exports.addStock = async (req, res) => {
  try {
    const stock = await Stock.create(req.body);

    res.status(201).json({
      message: "Stock Added Successfully",
      stock,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Stock
exports.updateStock = async (req, res) => {
  try {
    const stock = await Stock.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Stock Updated Successfully",
      stock,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Stock
exports.deleteStock = async (req, res) => {
  try {
    await Stock.findByIdAndDelete(req.params.id);

    res.json({
      message: "Stock Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};