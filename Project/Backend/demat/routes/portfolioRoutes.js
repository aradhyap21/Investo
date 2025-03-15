const express = require("express");
const { getPortfolio, addStock, deleteStock, updateStockPrice } = require("../controllers/portfolioController");
const router = express.Router();

router.get("/", getPortfolio);  // Fetch all stocks
router.post("/add", addStock);  // Add a new stock
router.delete("/:id", deleteStock);  // Remove a stock
router.put("/update/:id", updateStockPrice);  // Update stock price

module.exports = router;
