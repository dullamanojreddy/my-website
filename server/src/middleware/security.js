const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const validateEnv = require("../config/env");

const env = validateEnv();

/**
 * CORS configuration — only allows the configured frontend origin.
 */
const corsOptions = {
  origin: env.clientUrl,
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