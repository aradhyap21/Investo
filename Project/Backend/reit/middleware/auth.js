const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const { createError } = require("../utils/errorHandler")

// Protect routes
exports.protect = async (req, res, next) => {
  try {
    let token

    // Get token from header or cookie
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      // Get token from header
      token = req.headers.authorization.split(" ")[1]
    } else if (req.cookies.token) {
      // Get token from cookie
      token = req.cookies.token
    }

    // Check if token exists
    if (!token) {
      return next(createError(401, "Not authorized to access this resource"))
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from database
      const user = await User.findById(decoded.id)

      if (!user) {
        return next(createError(401, "Not authorized to access this resource"))
      }

      // Add user to request
      req.user = user
      next()
    } catch (error) {
      return next(createError(401, "Not authorized to access this resource"))
    }
  } catch (error) {
    next(error)
  }
}

// Authorize roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(createError(403, "Not authorized to access this resource"))
    }
    next()
  }
}

