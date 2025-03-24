const express = require("express");
const { calculateRD } = require("../controllers/rdController");
const router = express.Router();

router.post("/calculate", calculateRD);

module.exports = router;
