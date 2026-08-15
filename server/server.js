const mongoose = require("mongoose");
const { app, connectDB } = require("./src/app");
const validateEnv = require("./src/config/env");

const env = validateEnv();

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.warn("⚠️  Starting server with bundled fallback data. MongoDB features will be unavailable.");
  }

  const server = app.listen(env.port, () => {
    console.log(`🚀 Server running on port ${env.port} in ${env.env} mode`);
  });

  const gracefulShutdown = async (signal) => {
    console.log(`\n${signal} received. Closing server...`);
    server.close(async () => {
      await mongoose.disconnect();
      console.log("✅ Server closed gracefully.");
      process.exit(0);
    });
  };

  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
};

startServer();