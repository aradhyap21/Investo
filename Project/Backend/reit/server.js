const express = require("express")
const path = require("path")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session)
const dotenv = require("dotenv")
const morgan = require("morgan")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")

// Load environment variables
dotenv.config()

// Import routes
const authRoutes = require("./routes/authRoutes")
const portfolioRoutes = require("./routes/portfolioRoutes")
const reitRoutes = require("./routes/reitRoutes")
const calculatorRoutes = require("./routes/calculatorRoutes")
const userRoutes = require("./routes/userRoutes")

// Import database connection
const db = require("./config/database")

// Create Express app
const app = express()

// Set up session store
const sessionStore = new MySQLStore(
  {
    clearExpired: true,
    checkExpirationInterval: 900000, // 15 minutes
    expiration: 86400000, // 24 hours
    createDatabaseTable: true,
  },
  db,
)

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  session({
    key: "reit_session",
    secret: process.env.SESSION_SECRET || "reit_secret_key",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000, // 24 hours
    },
  }),
)

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false,
  }),
)

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
})
app.use("/api/", apiLimiter)

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// Serve static files
app.use(express.static(path.join(__dirname, "public")))

// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/portfolio", portfolioRoutes)
app.use("/api/reits", reitRoutes)
app.use("/api/calculator", calculatorRoutes)
app.use("/api/users", userRoutes)

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
  })
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Server Error",
  })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



