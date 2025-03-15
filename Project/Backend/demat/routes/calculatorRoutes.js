const express = require("express");
const { calculateBrokerage, calculateReturns } = require("../controllers/calculatorController");
const router = express.Router();

router.post("/brokerage", calculateBrokerage);
router.post("/returns", calculateReturns);

module.exports = router;
