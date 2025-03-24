const express = require("express");
const { calculateFD } = require("../controllers/fdController");
const router = express.Router();

router.post("/calculate", calculateFD);

module.exports = router;
