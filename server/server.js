require("dotenv").config();
require("express-async-errors");

const path = require("path");
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const seedData = require("./config/seedData");
const portfolioRoutes = require("./routes/portfolioRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000"
  })
);
app.use(express.json());

app.use("/api", portfolioRoutes);
app.use("/api", contactRoutes);

app.use("/assets", express.static(path.join(__dirname, "..", "assets")));

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API is running." });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Server error occurred." });
});

const startServer = async () => {
  await connectDB();
  await seedData();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
