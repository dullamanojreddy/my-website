const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    score: { type: String, default: "" },
    status: { type: String, default: "Completed" },
    certificatePath: { type: String, default: "" }
  },
  { timestamps: true, collection: "certifications" }
);

certificateSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Certificate", certificateSchema);