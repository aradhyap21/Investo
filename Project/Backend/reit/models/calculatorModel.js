const db = require("../config/database")

class Calculator {
  static async saveCalculation(calculationData) {
    try {
      const [result] = await db.query(
        `INSERT INTO saved_calculations 
        (user_id, initial_investment, investment_period, annual_return, dividend_yield, final_value, total_dividends, name) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          calculationData.userId,
          calculationData.initialInvestment,
          calculationData.investmentPeriod,
          calculationData.annualReturn,
          calculationData.dividendYield,
          calculationData.finalValue,
          calculationData.totalDividends,
          calculationData.name || `Calculation ${new Date().toISOString()}`,
        ],
      )
      return result.insertId
    } catch (error) {
      throw error
    }
  }

  static async getUserCalculations(userId) {
    try {
      const [rows] = await db.query("SELECT * FROM saved_calculations WHERE user_id = ? ORDER BY created_at DESC", [
        userId,
      ])
      return rows
    } catch (error) {
      throw error
    }
  }

  static async getCalculationById(id, userId) {
    try {
      const [rows] = await db.query("SELECT * FROM saved_calculations WHERE id = ? AND user_id = ?", [id, userId])
      return rows[0]
    } catch (error) {
      throw error
    }
  }

  static async deleteCalculation(id, userId) {
    try {
      const [result] = await db.query("DELETE FROM saved_calculations WHERE id = ? AND user_id = ?", [id, userId])
      return result.affectedRows > 0
    } catch (error) {
      throw error
    }
  }

  // Static method to calculate investment returns
  static calculateReturns(initialInvestment, years, annualReturn, dividendYield) {
    // Convert percentages to decimals
    const returnRate = annualReturn / 100
    const dividendRate = dividendYield / 100

    // Calculate compound growth
    const finalValue = initialInvestment * Math.pow(1 + returnRate, years)

    // Calculate total dividends (simplified model)
    let totalDividends = 0
    let currentValue = initialInvestment

    for (let i = 0; i < years; i++) {
      // Calculate dividend for this year
      const yearlyDividend = currentValue * dividendRate
      totalDividends += yearlyDividend

      // Update value for next year
      currentValue = currentValue * (1 + returnRate)
    }

    return {
      initialInvestment,
      years,
      annualReturn,
      dividendYield,
      finalValue,
      totalDividends,
      totalReturn: finalValue + totalDividends - initialInvestment,
      returnPercentage: ((finalValue + totalDividends) / initialInvestment - 1) * 100,
    }
  }
}

module.exports = Calculator

