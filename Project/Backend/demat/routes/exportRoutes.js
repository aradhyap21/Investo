const express = require("express");
const { exportTransactions } = require("../controllers/exportController");
const router = express.Router();

router.get("/transactions", exportTransactions);

module.exports = router;
