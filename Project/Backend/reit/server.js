const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");

// Import Routes
const portfolioRoutes = require("./routes/portfolioroutes");
const payoutRoutes = require("./routes/payoutRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const withdrawalRoutes = require("./routes/withdrawalRoutes");
const marketRoutes = require("./routes/marketRoutes");
const calculatorRoutes = require("./routes/calculatorRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Database Connection
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
    console.log("Connected to MySQL Database");
});

// Routes
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/payouts", payoutRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/withdrawals", withdrawalRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/calculate", calculatorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
