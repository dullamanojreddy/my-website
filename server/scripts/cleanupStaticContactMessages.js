require("dotenv").config();

const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const STATIC_MESSAGE_FILTER = {
  subject: { $exists: true },
  status: { $exists: true },
  email: { $regex: /@example\.com$/i }
};

const runCleanup = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection.db;

    const collectionsToClean = ["contact_messages", "messages"];
    let totalDeleted = 0;

    for (const collectionName of collectionsToClean) {
      const exists = await db.listCollections({ name: collectionName }).hasNext();
      if (!exists) {
        continue;
      }

      const result = await db
        .collection(collectionName)
        .deleteMany(STATIC_MESSAGE_FILTER);

      totalDeleted += result.deletedCount || 0;
      console.log(
        `[cleanup] ${collectionName}: deleted ${result.deletedCount || 0} static sample records`
      );
    }

    console.log(`[cleanup] Done. Total deleted: ${totalDeleted}`);
  } catch (error) {
    console.error("[cleanup] Failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

runCleanup();
