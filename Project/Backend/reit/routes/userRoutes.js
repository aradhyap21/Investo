const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const { protect } = require("../middleware/auth")

// All routes are protected
router.use(protect)

router.get("/profile", userController.getUserProfile)
router.put("/profile", userController.updateUserProfile)

module.exports = router

