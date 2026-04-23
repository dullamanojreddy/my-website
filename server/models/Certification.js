const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    score: { type: String, default: "" },
    status: { type: String, default: "Completed" },
    certificatePath: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certification", certificationSchema, "certifications");
