const express = require("express");
const { requestPayout } = require("../controllers/payoutController");
const router = express.Router();

router.post("/request", requestPayout);

module.exports = router;
