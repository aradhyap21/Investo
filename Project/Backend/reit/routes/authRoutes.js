const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const { protect } = require("../middleware/auth")

// Public routes
router.post("/register", authController.register)
router.post("/login", authController.login)
router.get("/logout", authController.logout)
router.get("/verify-email/:token", authController.verifyEmail)
router.post("/forgot-password", authController.forgotPassword)
router.post("/reset-password/:token", authController.resetPassword)

// Protected routes
router.get("/me", protect, authController.getCurrentUser)
router.post("/update-password", protect, authController.updatePassword)

module.exports = router

