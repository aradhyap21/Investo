const Portfolio = require("../models/portfolioModel")
const Reit = require("../models/reitModel")
const { createError } = require("../utils/errorHandler")

// Get user portfolio
exports.getUserPortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.getUserPortfolio(req.user.id)

    res.status(200).json({
      success: true,
      count: portfolio.length,
      data: portfolio,
    })
  } catch (error) {
    next(error)
  }
}

// Get portfolio summary
exports.getPortfolioSummary = async (req, res, next) => {
  try {
    const summary = await Portfolio.getPortfolioSummary(req.user.id)

    res.status(200).json({
      success: true,
      data: summary,
    })
  } catch (error) {
    next(error)
  }
}

// Add to portfolio
exports.addToPortfolio = async (req, res, next) => {
  try {
    const { reitId, shares, purchasePrice, purchaseDate } = req.body

    // Validate input
    if (!reitId || !shares || !purchasePrice) {
      return next(createError(400, "Please provide all required fields"))
    }

    // Check if REIT exists
    const reit = await Reit.findById(reitId)
    if (!reit) {
      return next(createError(404, "REIT not found"))
    }

    // Add to portfolio
    const portfolioId = await Portfolio.addToPortfolio({
      userId: req.user.id,
      reitId,
      shares,
      purchasePrice,
      purchaseDate,
    })

    res.status(201).json({
      success: true,
      message: "Added to portfolio successfully",
      data: { id: portfolioId },
    })
  } catch (error) {
    next(error)
  }
}

// Update portfolio item
exports.updatePortfolioItem = async (req, res, next) => {
  try {
    const { id } = req.params
    const { shares, purchasePrice, purchaseDate } = req.body

    // Validate input
    if (!shares && !purchasePrice && !purchaseDate) {
      return next(createError(400, "Please provide at least one field to update"))
    }

    // Check if portfolio item exists
    const portfolioItem = await Portfolio.getPortfolioItem(id, req.user.id)
    if (!portfolioItem) {
      return next(createError(404, "Portfolio item not found"))
    }

    // Update portfolio item
    const success = await Portfolio.updatePortfolioItem(id, req.user.id, {
      shares: shares || portfolioItem.shares,
      purchasePrice: purchasePrice || portfolioItem.purchase_price,
      purchaseDate: purchaseDate || portfolioItem.purchase_date,
    })

    if (!success) {
      return next(createError(500, "Failed to update portfolio item"))
    }

    res.status(200).json({
      success: true,
      message: "Portfolio item updated successfully",
    })
  } catch (error) {
    next(error)
  }
}

// Remove from portfolio
exports.removeFromPortfolio = async (req, res, next) => {
  try {
    const { id } = req.params

    // Remove from portfolio
    const success = await Portfolio.removeFromPortfolio(id, req.user.id)

    if (!success) {
      return next(createError(404, "Portfolio item not found"))
    }

    res.status(200).json({
      success: true,
      message: "Removed from portfolio successfully",
    })
  } catch (error) {
    next(error)
  }
}

// Get transaction history
exports.getTransactionHistory = async (req, res, next) => {
  try {
    const transactions = await Portfolio.getTransactionHistory(req.user.id)

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    })
  } catch (error) {
    next(error)
  }
}

