const express = require("express");
const { getWithdrawals, requestWithdrawal, updateWithdrawal } = require("../controllers/withdrawalController");
const router = express.Router();

router.get("/", getWithdrawals);  // Fetch all withdrawals
router.post("/request", requestWithdrawal);  // Submit a withdrawal request
router.put("/update/:id", updateWithdrawal);  // Update withdrawal status

module.exports = router;
