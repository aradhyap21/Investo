const express = require("express");
const { getWithdrawalHistory } = require("../controllers/withdrawalController");
const router = express.Router();

router.get("/history", getWithdrawalHistory);

module.exports = router;
