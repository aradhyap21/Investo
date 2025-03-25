const Calculator = require("../models/calculatorModel")
const { createError } = require("../utils/errorHandler")

// Calculate investment returns
exports.calculateReturns = async (req, res, next) => {
  try {
    const { initialInvestment, years, annualReturn, dividendYield } = req.body

    // Validate input
    if (!initialInvestment || !years || !annualReturn || !dividendYield) {
      return next(createError(400, "Please provide all required fields"))
    }

    // Calculate returns
    const results = Calculator.calculateReturns(
      Number.parseFloat(initialInvestment),
      Number.parseInt(years),
      Number.parseFloat(annualReturn),
      Number.parseFloat(dividendYield),
    )

    res.status(200).json({
      success: true,
      data: results,
    })
  } catch (error) {
    next(error)
  }
}

// Save calculation
exports.saveCalculation = async (req, res, next) => {
  try {
    const { initialInvestment, investmentPeriod, annualReturn, dividendYield, finalValue, totalDividends, name } =
      req.body

    // Validate input
    if (!initialInvestment || !investmentPeriod || !annualReturn || !dividendYield || !finalValue || !totalDividends) {
      return next(createError(400, "Please provide all required fields"))
    }

    // Save calculation
    const calculationId = await Calculator.saveCalculation({
      userId: req.user.id,
      initialInvestment,
      investmentPeriod,
      annualReturn,
      dividendYield,
      finalValue,
      totalDividends,
      name,
    })

    res.status(201).json({
      success: true,
      message: "Calculation saved successfully",
      data: { id: calculationId },
    })
  } catch (error) {
    next(error)
  }
}

// Get user calculations
exports.getUserCalculations = async (req, res, next) => {
  try {
    const calculations = await Calculator.getUserCalculations(req.user.id)

    res.status(200).json({
      success: true,
      count: calculations.length,
      data: calculations,
    })
  } catch (error) {
    next(error)
  }
}

// Get calculation by ID
exports.getCalculation = async (req, res, next) => {
  try {
    const { id } = req.params

    const calculation = await Calculator.getCalculationById(id, req.user.id)

    if (!calculation) {
      return next(createError(404, "Calculation not found"))
    }

    res.status(200).json({
      success: true,
      data: calculation,
    })
  } catch (error) {
    next(error)
  }
}

// Delete calculation
exports.deleteCalculation = async (req, res, next) => {
  try {
    const { id } = req.params

    const success = await Calculator.deleteCalculation(id, req.user.id)

    if (!success) {
      return next(createError(404, "Calculation not found"))
    }

    res.status(200).json({
      success: true,
      message: "Calculation deleted successfully",
    })
  } catch (error) {
    next(error)
  }
}

