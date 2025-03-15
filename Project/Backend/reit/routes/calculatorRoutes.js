const express = require("express");
const { calculateReturns } = require("../controllers/calculatorController");
const router = express.Router();

router.post("/returns", calculateReturns);

module.exports = router;
