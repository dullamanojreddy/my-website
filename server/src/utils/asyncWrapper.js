/**
 * Wraps async route handlers so rejected promises are
 * forwarded to Express's error-handling middleware.
 */
const asyncWrapper = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncWrapper;