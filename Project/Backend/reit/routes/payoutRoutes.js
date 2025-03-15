const express = require("express");
const { getPayouts, requestPayout, updatePayout } = require("../controllers/payoutController");
const router = express.Router();

router.get("/", getPayouts);
router.post("/request", requestPayout);
router.put("/update/:id", updatePayout);

module.exports = router;
