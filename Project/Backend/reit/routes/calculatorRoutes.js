const express = require("express")
const router = express.Router()
const calculatorController = require("../controllers/calculatorController")
const { protect } = require("../middleware/auth")

// Public routes
router.post("/calculate", calculatorController.calculateReturns)

// Protected routes
router.use(protect)
router.post("/save", calculatorController.saveCalculation)
router.get("/saved", calculatorController.getUserCalculations)
router.get("/saved/:id", calculatorController.getCalculation)
router.delete("/saved/:id", calculatorController.deleteCalculation)

module.exports = router

