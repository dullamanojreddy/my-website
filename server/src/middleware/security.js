const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const validateEnv = require("../config/env");

const env = validateEnv();

/**
 * CORS configuration — allows configured production URL(s), any Vercel
 * deployment (production + preview), and localhost in development.
 *
 * CLIENT_URL may contain a single origin or a comma-separated list, e.g.
 *   CLIENT_URL=https://my-site.vercel.app,https://other.example.com
 */
const getCorsOrigin = () => {
  const configuredOrigins = (env.clientUrl || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return (origin, callback) => {
    const allowedOrigins = [
      ...new Set([
        ...configuredOrigins,
        "http://localhost:3000",
        "http://127.0.0.1:3000"
      ])
    ];

    // Allow any Vercel-hosted frontend (custom domains and *.vercel.app
    // production/preview deployments) without requiring an exact env match.
    const isAllowed =
      !origin ||
      allowedOrigins.includes(origin) ||
      /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin);

    if (isAllowed) {
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

  // Trust first proxy for X-Forwarded-For header (Render sets this)
  app.set('trust proxy', 1);

  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
  });

  app.use("/api/", apiLimiter);
};

module.exports = { securityMiddleware, corsOptions };