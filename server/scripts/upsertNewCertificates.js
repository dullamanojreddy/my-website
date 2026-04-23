require("dotenv").config();

const mongoose = require("mongoose");
const dns = require("dns");

const Certification = require("../models/Certification");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const CERTIFICATES = [
  {
    title: "Programming in Modern C++",
    issuer: "NPTEL",
    score: "67%",
    status: "Completed",
    certificatePath: "/assets/certificate-Programming in Modern C++.pdf"
  },
  {
    title: "CCNA Introduction to Networks",
    issuer: "Cisco Networking Academy",
    score: "",
    status: "Completed",
    certificatePath: "/assets/CCNA Introduction to Networks.pdf"
  },
  {
    title: "Cybersecurity Essentials",
    issuer: "Cisco Networking Academy",
    score: "",
    status: "Completed",
    certificatePath: "/assets/cybersecurity essentials.pdf"
  }
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    for (const cert of CERTIFICATES) {
      await Certification.updateOne(
        { title: cert.title },
        { $set: cert },
        { upsert: true }
      );
    }

    console.log(`[certifications] Upserted ${CERTIFICATES.length} certifications.`);
  } catch (error) {
    console.error("[certifications] Upsert failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();
