const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const applicationRoutes = require("./routes/applicationRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/applications", applicationRoutes);

app.listen(5000, () => console.log("✅ Server running on port 5000"));
