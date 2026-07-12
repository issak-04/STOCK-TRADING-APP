const Portfolio = require("../models/portfolioModel");

// Get Logged-in User Portfolio
exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find({
      user: req.user.id,
    }).populate("stock", "symbol companyName price sector");

    res.status(200).json(portfolio);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};