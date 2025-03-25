const db = require("../config/database")

class Reit {
  static async findAll() {
    try {
      const [rows] = await db.query("SELECT * FROM reits WHERE is_active = TRUE ORDER BY property_name")
      return rows
    } catch (error) {
      throw error
    }
  }

  static async findById(id) {
    try {
      const [rows] = await db.query("SELECT * FROM reits WHERE id = ?", [id])
      return rows[0]
    } catch (error) {
      throw error
    }
  }

  static async findByPropertyId(propertyId) {
    try {
      const [rows] = await db.query("SELECT * FROM reits WHERE property_id = ?", [propertyId])
      return rows[0]
    } catch (error) {
      throw error
    }
  }

  static async findByType(propertyType) {
    try {
      const [rows] = await db.query("SELECT * FROM reits WHERE property_type = ? AND is_active = TRUE", [propertyType])
      return rows
    } catch (error) {
      throw error
    }
  }

  static async create(reitData) {
    try {
      const [result] = await db.query(
        `INSERT INTO reits 
        (property_id, property_name, description, property_type, location, 
        market_cap, dividend_yield, price_per_share, performance, image_url) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          reitData.propertyId,
          reitData.propertyName,
          reitData.description,
          reitData.propertyType,
          reitData.location,
          reitData.marketCap,
          reitData.dividendYield,
          reitData.pricePerShare,
          reitData.performance,
          reitData.imageUrl,
        ],
      )
      return result.insertId
    } catch (error) {
      throw error
    }
  }

  static async update(id, reitData) {
    try {
      const [result] = await db.query(
        `UPDATE reits SET 
        property_name = ?, description = ?, property_type = ?, location = ?, 
        market_cap = ?, dividend_yield = ?, price_per_share = ?, performance = ?, 
        image_url = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?`,
        [
          reitData.propertyName,
          reitData.description,
          reitData.propertyType,
          reitData.location,
          reitData.marketCap,
          reitData.dividendYield,
          reitData.pricePerShare,
          reitData.performance,
          reitData.imageUrl,
          id,
        ],
      )
      return result.affectedRows > 0
    } catch (error) {
      throw error
    }
  }

  static async delete(id) {
    try {
      // Soft delete by setting is_active to FALSE
      const [result] = await db.query(
        "UPDATE reits SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [id],
      )
      return result.affectedRows > 0
    } catch (error) {
      throw error
    }
  }

  static async search(query) {
    try {
      const searchTerm = `%${query}%`
      const [rows] = await db.query(
        `SELECT * FROM reits 
        WHERE (property_name LIKE ? OR description LIKE ? OR location LIKE ?) 
        AND is_active = TRUE`,
        [searchTerm, searchTerm, searchTerm],
      )
      return rows
    } catch (error) {
      throw error
    }
  }

  static async getTopPerforming(limit = 5) {
    try {
      const [rows] = await db.query("SELECT * FROM reits WHERE is_active = TRUE ORDER BY performance DESC LIMIT ?", [
        limit,
      ])
      return rows
    } catch (error) {
      throw error
    }
  }

  static async getHighestDividend(limit = 5) {
    try {
      const [rows] = await db.query("SELECT * FROM reits WHERE is_active = TRUE ORDER BY dividend_yield DESC LIMIT ?", [
        limit,
      ])
      return rows
    } catch (error) {
      throw error
    }
  }
}

module.exports = Reit

