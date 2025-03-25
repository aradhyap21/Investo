const mysql = require("mysql2")
const dotenv = require("dotenv")

dotenv.config()

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_NAME || "investo",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Convert pool to use promises
const promisePool = pool.promise()

// Test connection
promisePool
  .query("SELECT 1")
  .then(() => console.log("Database connection established"))
  .catch((err) => console.error("Database connection failed:", err))

module.exports = promisePool

