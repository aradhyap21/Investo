const db = require("../config/database")

class Portfolio {
  static async getUserPortfolio(userId) {
    try {
      const [rows] = await db.query(
        `SELECT up.id, up.user_id, up.reit_id, up.shares, up.purchase_price, up.purchase_date,
        r.property_id, r.property_name, r.market_cap, r.dividend_yield, r.price_per_share, r.performance
        FROM user_portfolio up
        JOIN reits r ON up.reit_id = r.id
        WHERE up.user_id = ?
        ORDER BY up.purchase_date DESC`,
        [userId],
      )
      return rows
    } catch (error) {
      throw error
    }
  }

  static async getPortfolioItem(id, userId) {
    try {
      const [rows] = await db.query(
        `SELECT up.id, up.user_id, up.reit_id, up.shares, up.purchase_price, up.purchase_date,
        r.property_id, r.property_name, r.market_cap, r.dividend_yield, r.price_per_share, r.performance
        FROM user_portfolio up
        JOIN reits r ON up.reit_id = r.id
        WHERE up.id = ? AND up.user_id = ?`,
        [id, userId],
      )
      return rows[0]
    } catch (error) {
      throw error
    }
  }

  static async addToPortfolio(portfolioData) {
    try {
      const [result] = await db.query(
        `INSERT INTO user_portfolio 
        (user_id, reit_id, shares, purchase_price, purchase_date) 
        VALUES (?, ?, ?, ?, ?)`,
        [
          portfolioData.userId,
          portfolioData.reitId,
          portfolioData.shares,
          portfolioData.purchasePrice,
          portfolioData.purchaseDate || new Date(),
        ],
      )

      // Record the transaction
      await db.query(
        `INSERT INTO transactions 
        (user_id, reit_id, transaction_type, shares, price_per_share, total_amount) 
        VALUES (?, ?, 'buy', ?, ?, ?)`,
        [
          portfolioData.userId,
          portfolioData.reitId,
          portfolioData.shares,
          portfolioData.purchasePrice,
          portfolioData.shares * portfolioData.purchasePrice,
        ],
      )

      return result.insertId
    } catch (error) {
      throw error
    }
  }

  static async updatePortfolioItem(id, userId, portfolioData) {
    try {
      const [result] = await db.query(
        `UPDATE user_portfolio SET 
        shares = ?, purchase_price = ?, purchase_date = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ? AND user_id = ?`,
        [portfolioData.shares, portfolioData.purchasePrice, portfolioData.purchaseDate, id, userId],
      )
      return result.affectedRows > 0
    } catch (error) {
      throw error
    }
  }

  static async removeFromPortfolio(id, userId) {
    try {
      // Get the portfolio item before deleting
      const [portfolioItem] = await db.query(
        "SELECT reit_id, shares, purchase_price FROM user_portfolio WHERE id = ? AND user_id = ?",
        [id, userId],
      )

      if (portfolioItem.length === 0) {
        return false
      }

      // Delete the portfolio item
      const [result] = await db.query("DELETE FROM user_portfolio WHERE id = ? AND user_id = ?", [id, userId])

      if (result.affectedRows > 0) {
        // Record the transaction
        await db.query(
          `INSERT INTO transactions 
          (user_id, reit_id, transaction_type, shares, price_per_share, total_amount) 
          VALUES (?, ?, 'sell', ?, ?, ?)`,
          [
            userId,
            portfolioItem[0].reit_id,
            portfolioItem[0].shares,
            portfolioItem[0].purchase_price,
            portfolioItem[0].shares * portfolioItem[0].purchase_price,
          ],
        )
        return true
      }
      return false
    } catch (error) {
      throw error
    }
  }

  static async getPortfolioSummary(userId) {
    try {
      // Get total properties
      const [totalPropertiesResult] = await db.query("SELECT COUNT(*) as total FROM user_portfolio WHERE user_id = ?", [
        userId,
      ])
      const totalProperties = totalPropertiesResult[0].total

      // Get total market value and average dividend yield
      const [summaryResult] = await db.query(
        `SELECT 
        SUM(up.shares * r.price_per_share) as totalMarketValue,
        AVG(r.dividend_yield) as avgDividendYield
        FROM user_portfolio up
        JOIN reits r ON up.reit_id = r.id
        WHERE up.user_id = ?`,
        [userId],
      )

      return {
        totalProperties,
        totalMarketValue: summaryResult[0].totalMarketValue || 0,
        avgDividendYield: summaryResult[0].avgDividendYield || 0,
      }
    } catch (error) {
      throw error
    }
  }

  static async getTransactionHistory(userId) {
    try {
      const [rows] = await db.query(
        `SELECT t.id, t.transaction_type, t.shares, t.price_per_share, t.total_amount, 
        t.transaction_date, t.status, r.property_id, r.property_name
        FROM transactions t
        JOIN reits r ON t.reit_id = r.id
        WHERE t.user_id = ?
        ORDER BY t.transaction_date DESC`,
        [userId],
      )
      return rows
    } catch (error) {
      throw error
    }
  }
}

module.exports = Portfolio

