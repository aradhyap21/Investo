const express = require("express")
const router = express.Router()
const reitController = require("../controllers/reitController")
const { protect, authorize } = require("../middleware/auth")

// Public routes
router.get("/", reitController.getAllReits)
router.get("/search", reitController.searchReits)
router.get("/top-performing", reitController.getTopPerforming)
router.get("/highest-dividend", reitController.getHighestDividend)
router.get("/:id", reitController.getReit)
router.get("/property/:propertyId", reitController.getReitByPropertyId)
router.get("/type/:type", reitController.getReitsByType)

// Protected routes (admin only)
router.post("/", protect, authorize("admin"), reitController.createReit)
router.put("/:id", protect, authorize("admin"), reitController.updateReit)
router.delete("/:id", protect, authorize("admin"), reitController.deleteReit)

module.exports = router

