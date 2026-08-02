const express = require("express");
const { securityMiddleware } = require("./middleware/security");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/error");
const portfolioRoutes = require("./routes/portfolioRoutes");
const contactRoutes = require("./routes/contactRoutes");
const { connectDB } = require("./config/db");

const app = express();

/**
 * Mount security middleware first.
 */
securityMiddleware(app);

/**
 * Health check — confirms the API is running.
 */
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Portfolio API is running." });
});

/**
 * API routes.
 */
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/contact", contactRoutes);

/**
 * 404 handler for undefined routes.
 */
app.use(notFound);

/**
 * Global error handler — must be registered after all routes/middleware.
 */
app.use(errorHandler);

module.exports = { app, connectDB };