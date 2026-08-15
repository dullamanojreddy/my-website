const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const validateEnv = require("../config/env");

const env = validateEnv();

/**
 * CORS configuration — allows localhost in development, production URL in production.
 */
const getCorsOrigin = () => {
  if (env.env === "production") {
    return env.clientUrl;
  }

  return (origin, callback) => {
    const allowedOrigins = [
      env.clientUrl,
      "http://localhost:3000",
      "http://127.0.0.1:3000"
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  };
};

const corsOptions = {
  origin: getCorsOrigin(),
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

/**
 * Global security middleware stack.
 */
const securityMiddleware = (app) => {
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(mongoSanitize());
  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true, limit: "10kb" }));

  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
  });

  app.use("/api/", apiLimiter);
};

module.exports = { securityMiddleware, corsOptions };