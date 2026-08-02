const ApiError = require("../utils/ApiError");

/**
 * Catches requests to undefined routes and returns a 404 JSON response.
 */
const notFound = (req, res, next) => {
  next(new ApiError(`Route ${req.originalUrl} not found`, 404));
};

module.exports = notFound;