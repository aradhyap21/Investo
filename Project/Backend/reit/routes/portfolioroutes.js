const express = require("express");
const { getPortfolio, addProperty, deleteProperty, updateProperty } = require("../controllers/portfolioController");
const router = express.Router();

router.get("/", getPortfolio);
router.post("/add", addProperty);
router.delete("/:id", deleteProperty);
router.put("/update/:id", updateProperty);

module.exports = router;
