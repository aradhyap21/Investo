require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const payoutRoutes = require("./src/routes/payoutRoutes");
const complaintRoutes = require("./src/routes/complaintRoutes");
const withdrawalRoutes = require("./src/routes/withdrawalRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/payouts", payoutRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/withdrawals", withdrawalRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
