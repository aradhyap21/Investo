const db = require("../config/database")
const bcrypt = require("bcryptjs")

class User {
  static async findById(id) {
    try {
      const [rows] = await db.query(
        "SELECT id, first_name, last_name, email, phone, address, role, is_verified, created_at FROM users WHERE id = ?",
        [id],
      )
      return rows[0]
    } catch (error) {
      throw error
    }
  }

  static async findByEmail(email) {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email])
      return rows[0]
    } catch (error) {
      throw error
    }
  }

  static async create(userData) {
    try {
      // Hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(userData.password, salt)

      const [result] = await db.query(
        "INSERT INTO users (first_name, last_name, email, password, phone, address, verification_token) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          userData.firstName,
          userData.lastName,
          userData.email,
          hashedPassword,
          userData.phone || null,
          userData.address || null,
          userData.verificationToken || null,
        ],
      )

      return result.insertId
    } catch (error) {
      throw error
    }
  }

  static async update(id, userData) {
    try {
      const [result] = await db.query(
        "UPDATE users SET first_name = ?, last_name = ?, phone = ?, address = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [userData.firstName, userData.lastName, userData.phone, userData.address, id],
      )
      return result.affectedRows > 0
    } catch (error) {
      throw error
    }
  }

  static async updatePassword(id, password) {
    try {
      // Hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const [result] = await db.query("UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", [
        hashedPassword,
        id,
      ])
      return result.affectedRows > 0
    } catch (error) {
      throw error
    }
  }

  static async verifyUser(token) {
    try {
      const [result] = await db.query(
        "UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE verification_token = ?",
        [token],
      )
      return result.affectedRows > 0
    } catch (error) {
      throw error
    }
  }

  static async setResetPasswordToken(email, token, expires) {
    try {
      const [result] = await db.query(
        "UPDATE users SET reset_password_token = ?, reset_password_expires = ? WHERE email = ?",
        [token, expires, email],
      )
      return result.affectedRows > 0
    } catch (error) {
      throw error
    }
  }

  static async resetPassword(token, password) {
    try {
      // Hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const [result] = await db.query(
        "UPDATE users SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE reset_password_token = ? AND reset_password_expires > NOW()",
        [hashedPassword, token],
      )
      return result.affectedRows > 0
    } catch (error) {
      throw error
    }
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
  }
}

module.exports = User

