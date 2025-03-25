const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const { sendEmail } = require("../utils/emailService")
const { createError } = require("../utils/errorHandler")

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

// Register a new user
exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phone, address } = req.body

    // Check if user already exists
    const existingUser = await User.findByEmail(email)
    if (existingUser) {
      return next(createError(400, "Email already in use"))
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(20).toString("hex")

    // Create user
    const userId = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      verificationToken,
    })

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`
    await sendEmail({
      to: email,
      subject: "Verify Your Email",
      html: `
        <h1>Welcome to REIT Investments!</h1>
        <p>Thank you for registering. Please verify your email by clicking the link below:</p>
        <a href="${verificationUrl}" style="padding: 10px 20px; background-color: #1a2e44; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p>If you did not register for an account, please ignore this email.</p>
      `,
    })

    res.status(201).json({
      success: true,
      message: "Registration successful. Please check your email to verify your account.",
    })
  } catch (error) {
    next(error)
  }
}

// Login user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Check if email and password are provided
    if (!email || !password) {
      return next(createError(400, "Please provide email and password"))
    }

    // Check if user exists
    const user = await User.findByEmail(email)
    if (!user) {
      return next(createError(401, "Invalid credentials"))
    }

    // Check if password is correct
    const isMatch = await User.comparePassword(password, user.password)
    if (!isMatch) {
      return next(createError(401, "Invalid credentials"))
    }

    // Check if user is verified
    if (!user.is_verified) {
      return next(createError(401, "Please verify your email before logging in"))
    }

    // Generate token
    const token = generateToken(user.id)

    // Remove password from response
    user.password = undefined

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    next(error)
  }
}

// Logout user
exports.logout = (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000), // 10 seconds
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  })
}

// Get current user
exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) {
      return next(createError(404, "User not found"))
    }

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    })
  } catch (error) {
    next(error)
  }
}

// Verify email
exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params

    const success = await User.verifyUser(token)

    if (!success) {
      return next(createError(400, "Invalid or expired verification token"))
    }

    res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now log in.",
    })
  } catch (error) {
    next(error)
  }
}

// Forgot password
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body

    const user = await User.findByEmail(email)

    if (!user) {
      return next(createError(404, "No user found with that email"))
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex")

    // Set token expiry (1 hour)
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000)

    // Save to database
    await User.setResetPasswordToken(email, resetToken, resetExpires)

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`

    // Send email
    await sendEmail({
      to: email,
      subject: "Password Reset",
      html: `
        <h1>Password Reset Request</h1>
        <p>You requested a password reset. Please click the link below to reset your password:</p>
        <a href="${resetUrl}" style="padding: 10px 20px; background-color: #1a2e44; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>This link is valid for 1 hour.</p>
      `,
    })

    res.status(200).json({
      success: true,
      message: "Password reset email sent",
    })
  } catch (error) {
    next(error)
  }
}

// Reset password
exports.resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params
    const { password } = req.body

    if (!password || password.length < 6) {
      return next(createError(400, "Password must be at least 6 characters"))
    }

    const success = await User.resetPassword(token, password)

    if (!success) {
      return next(createError(400, "Invalid or expired reset token"))
    }

    res.status(200).json({
      success: true,
      message: "Password reset successful. You can now log in with your new password.",
    })
  } catch (error) {
    next(error)
  }
}

// Update password
exports.updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body

    // Get user
    const user = await User.findByEmail(req.user.email)

    // Check current password
    const isMatch = await User.comparePassword(currentPassword, user.password)

    if (!isMatch) {
      return next(createError(401, "Current password is incorrect"))
    }

    // Update password
    await User.updatePassword(user.id, newPassword)

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    })
  } catch (error) {
    next(error)
  }
}

