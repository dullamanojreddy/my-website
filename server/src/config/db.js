const mongoose = require("mongoose");

const getMongoUri = () =>
  process.env.MONGO_URI || process.env.MONGODB_URI || "";

/**
 * Establishes a Mongo connection. Uses a connection pool that is reused
 * across warm serverless/deployment instances.
 */
const connectDB = async () => {
  const uri = getMongoUri();

  if (!uri) {
    throw new Error("MONGO_URI is not configured.");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  mongoose.connection.on("error", (error) => {
    console.error("❌ MongoDB runtime error:", error.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected.");
  });

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
      maxPoolSize: 10
    });
    console.log("✅ MongoDB connected successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }

  return mongoose.connection;
};

module.exports = { connectDB, getMongoUri };