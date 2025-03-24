require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const fdRoutes = require("./src/routes/fdRoutes");
const rdRoutes = require("./src/routes/rdRoutes");
const bankRoutes = require("./src/routes/bankRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/fd", fdRoutes);
app.use("/api/rd", rdRoutes);
app.use("/api/banks", bankRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
