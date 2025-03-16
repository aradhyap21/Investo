const express = require("express");
const { submitComplaint } = require("../controllers/complaintController");
const router = express.Router();

router.post("/submit", submitComplaint);

module.exports = router;
