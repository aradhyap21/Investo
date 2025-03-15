const express = require("express");
const { submitForm } = require("../controllers/accountController");
const router = express.Router();

router.post("/submit", submitForm);

module.exports = router;
