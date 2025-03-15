const express = require("express");
const { getStockPrice } = require("../controllers/marketController");
const router = express.Router();

router.get("/:symbol", getStockPrice);

module.exports = router;
