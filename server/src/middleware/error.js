const ApiError = require("../utils/ApiError");

/**
 * Global Express error handler.
 * Catches operational errors and formats a consistent JSON response.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: Object.values(err.errors).map((e) => e.message)
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `${field} already exists.`
    });
  }

  console.error(`[${new Date().toISOString()}]`, err);

  res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = errorHandler;