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

// ✅ IMPORTANT: Railway requires process.env.PORT
const PORT = process.env.PORT || 5000;

/* ---------------- CORS CONFIG ---------------- */
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.CLIENT_URL_2,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://dullamanojreddy.github.io"
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  })
);

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.json());

/* ---------------- ROUTES ---------------- */
app.use("/api", portfolioRoutes);
app.use("/api", contactRoutes);

/* ---------------- STATIC FILES ---------------- */
app.use("/assets", express.static(path.join(__dirname, "..", "assets")));

/* ---------------- HEALTH CHECK ---------------- */
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API is running." });
});

/* ---------------- ERROR HANDLER ---------------- */
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Server error occurred."
  });
});

/* ---------------- START SERVER (RAILWAY FIX) ---------------- */
const startServer = async () => {
  try {
    await connectDB();
    await seedData();

    // ✅ CRITICAL FIX: bind to 0.0.0.0 for Railway
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();