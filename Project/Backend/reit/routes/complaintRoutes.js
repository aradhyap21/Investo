const express = require("express");
const { getComplaints, submitComplaint, updateComplaint } = require("../controllers/complaintController");
const router = express.Router();

router.get("/", getComplaints);  // Fetch all complaints
router.post("/submit", submitComplaint);  // Submit a new complaint
router.put("/update/:id", updateComplaint);  // Update complaint status

module.exports = router;
