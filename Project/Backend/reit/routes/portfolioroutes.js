const express = require("express")
const router = express.Router()
const portfolioController = require("../controllers/portfolioController")
const { protect } = require("../middleware/auth")

// All routes are protected
router.use(protect)

router.get("/", portfolioController.getUserPortfolio)
router.get("/summary", portfolioController.getPortfolioSummary)
router.post("/", portfolioController.addToPortfolio)
router.put("/:id", portfolioController.updatePortfolioItem)
router.delete("/:id", portfolioController.removeFromPortfolio)
router.get("/transactions", portfolioController.getTransactionHistory)

module.exports = router

