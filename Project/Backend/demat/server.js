const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Import Routes
const portfolioRoutes = require("./routes/portfolioRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const marketRoutes = require("./routes/marketRoutes");
const accountRoutes = require("./routes/accountRoutes");
const calculatorRoutes = require("./routes/calculatorRoutes");
const exportRoutes = require("./routes/exportRoutes");

app.use("/api/portfolio", portfolioRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/calculate", calculatorRoutes);
app.use("/api/export", exportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
