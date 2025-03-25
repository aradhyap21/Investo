const User = require("../models/userModel")
const { createError } = require("../utils/errorHandler")

// Get user profile
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) {
      return next(createError(404, "User not found"))
    }

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        createdAt: user.created_at,
      },
    })
  } catch (error) {
    next(error)
  }
}

// Update user profile
exports.updateUserProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, address } = req.body

    // Update user
    const success = await User.update(req.user.id, {
      firstName,
      lastName,
      phone,
      address,
    })

    if (!success) {
      return next(createError(500, "Failed to update profile"))
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    })
  } catch (error) {
    next(error)
  }
}

