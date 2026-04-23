require("dotenv").config();

const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const TARGET_COLLECTION = "contact_messages";

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection.db;

    const exists = await db.listCollections({ name: TARGET_COLLECTION }).hasNext();
    if (!exists) {
      console.log(`[drop] ${TARGET_COLLECTION} does not exist.`);
      return;
    }

    const count = await db.collection(TARGET_COLLECTION).countDocuments();
    if (count > 0) {
      console.log(
        `[drop] ${TARGET_COLLECTION} has ${count} document(s). Not dropping to avoid data loss.`
      );
      return;
    }

    await db.dropCollection(TARGET_COLLECTION);
    console.log(`[drop] ${TARGET_COLLECTION} dropped successfully.`);
  } catch (error) {
    console.error("[drop] Failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();
