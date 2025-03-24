const express = require("express");
const { submitApplication, getApplications } = require("../controllers/applicationController");
const router = express.Router();

router.post("/submit", submitApplication);
router.get("/all", getApplications);

module.exports = router;
