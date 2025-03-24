const express = require("express");
const { getBankRates, updateBankRate } = require("../controllers/bankController");
const router = express.Router();

router.get("/rates", getBankRates);
router.post("/update", updateBankRate);

module.exports = router;
