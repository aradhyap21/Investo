const Reit = require("../models/reitModel")
const { createError } = require("../utils/errorHandler")

// Get all REITs
exports.getAllReits = async (req, res, next) => {
  try {
    const reits = await Reit.findAll()

    res.status(200).json({
      success: true,
      count: reits.length,
      data: reits,
    })
  } catch (error) {
    next(error)
  }
}

// Get single REIT
exports.getReit = async (req, res, next) => {
  try {
    const { id } = req.params

    const reit = await Reit.findById(id)

    if (!reit) {
      return next(createError(404, "REIT not found"))
    }

    res.status(200).json({
      success: true,
      data: reit,
    })
  } catch (error) {
    next(error)
  }
}

// Get REIT by property ID
exports.getReitByPropertyId = async (req, res, next) => {
  try {
    const { propertyId } = req.params

    const reit = await Reit.findByPropertyId(propertyId)

    if (!reit) {
      return next(createError(404, "REIT not found"))
    }

    res.status(200).json({
      success: true,
      data: reit,
    })
  } catch (error) {
    next(error)
  }
}

// Get REITs by type
exports.getReitsByType = async (req, res, next) => {
  try {
    const { type } = req.params

    const reits = await Reit.findByType(type)

    res.status(200).json({
      success: true,
      count: reits.length,
      data: reits,
    })
  } catch (error) {
    next(error)
  }
}

// Create REIT (admin only)
exports.createReit = async (req, res, next) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return next(createError(403, "Not authorized to access this resource"))
    }

    const {
      propertyId,
      propertyName,
      description,
      propertyType,
      location,
      marketCap,
      dividendYield,
      pricePerShare,
      performance,
      imageUrl,
    } = req.body

    // Validate input
    if (
      !propertyId ||
      !propertyName ||
      !propertyType ||
      !marketCap ||
      !dividendYield ||
      !pricePerShare ||
      !performance
    ) {
      return next(createError(400, "Please provide all required fields"))
    }

    // Check if property ID already exists
    const existingReit = await Reit.findByPropertyId(propertyId)
    if (existingReit) {
      return next(createError(400, "Property ID already exists"))
    }

    // Create REIT
    const reitId = await Reit.create({
      propertyId,
      propertyName,
      description,
      propertyType,
      location,
      marketCap,
      dividendYield,
      pricePerShare,
      performance,
      imageUrl,
    })

    res.status(201).json({
      success: true,
      message: "REIT created successfully",
      data: { id: reitId },
    })
  } catch (error) {
    next(error)
  }
}

// Update REIT (admin only)
exports.updateReit = async (req, res, next) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return next(createError(403, "Not authorized to access this resource"))
    }

    const { id } = req.params

    // Check if REIT exists
    const reit = await Reit.findById(id)
    if (!reit) {
      return next(createError(404, "REIT not found"))
    }

    // Update REIT
    const success = await Reit.update(id, req.body)

    if (!success) {
      return next(createError(500, "Failed to update REIT"))
    }

    res.status(200).json({
      success: true,
      message: "REIT updated successfully",
    })
  } catch (error) {
    next(error)
  }
}

// Delete REIT (admin only)
exports.deleteReit = async (req, res, next) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return next(createError(403, "Not authorized to access this resource"))
    }

    const { id } = req.params

    // Check if REIT exists
    const reit = await Reit.findById(id)
    if (!reit) {
      return next(createError(404, "REIT not found"))
    }

    // Delete REIT
    const success = await Reit.delete(id)

    if (!success) {
      return next(createError(500, "Failed to delete REIT"))
    }

    res.status(200).json({
      success: true,
      message: "REIT deleted successfully",
    })
  } catch (error) {
    next(error)
  }
}

// Search REITs
exports.searchReits = async (req, res, next) => {
  try {
    const { query } = req.query

    if (!query) {
      return next(createError(400, "Please provide a search query"))
    }

    const reits = await Reit.search(query)

    res.status(200).json({
      success: true,
      count: reits.length,
      data: reits,
    })
  } catch (error) {
    next(error)
  }
}

// Get top performing REITs
exports.getTopPerforming = async (req, res, next) => {
  try {
    const { limit } = req.query

    const reits = await Reit.getTopPerforming(limit || 5)

    res.status(200).json({
      success: true,
      count: reits.length,
      data: reits,
    })
  } catch (error) {
    next(error)
  }
}

// Get highest dividend REITs
exports.getHighestDividend = async (req, res, next) => {
  try {
    const { limit } = req.query

    const reits = await Reit.getHighestDividend(limit || 5)

    res.status(200).json({
      success: true,
      count: reits.length,
      data: reits,
    })
  } catch (error) {
    next(error)
  }
}

