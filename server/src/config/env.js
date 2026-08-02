const dotenv = require("dotenv");

dotenv.config();

/**
 * Validates that required environment variables are present in production.
 * Fails fast during boot if critical variables are missing.
 */
const validateEnv = () => {
  if (process.env.NODE_ENV === "production") {
    const required = ["MONGO_URI", "CLIENT_URL"];
    const missing = required.filter((key) => !process.env[key]);

    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variables in production: ${missing.join(", ")}`
      );
    }
  }

  const port = Number(process.env.PORT) || 5000;
  if (Number.isNaN(port) || port <= 0) {
    throw new Error("PORT must be a positive number.");
  }

  return {
    env: process.env.NODE_ENV || "development",
    port,
    mongoUri: process.env.MONGO_URI || "",
    clientUrl: process.env.CLIENT_URL || "http://localhost:3000"
  };
};

module.exports = validateEnv;