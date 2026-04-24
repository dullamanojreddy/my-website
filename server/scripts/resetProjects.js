require("dotenv").config();

const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const TARGET_COLLECTION = "projects";

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection.db;

    const exists = await db.listCollections({ name: TARGET_COLLECTION }).hasNext();
    if (!exists) {
      console.log(`[reset] ${TARGET_COLLECTION} does not exist.`);
      await mongoose.disconnect();
      return;
    }

    await db.dropCollection(TARGET_COLLECTION);
    console.log(`[reset] ${TARGET_COLLECTION} dropped successfully. Restart server to re-seed with new projects.`);
  } catch (error) {
    console.error("[reset] Failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();
