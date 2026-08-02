const mongoose = require("mongoose");

const qualificationSchema = new mongoose.Schema(
  {
    education: { type: String, required: true, trim: true },
    institution: { type: String, required: true, trim: true },
    score: { type: String, default: "" },
    status: { type: String, default: "Pass" }
  },
  { timestamps: true, collection: "qualifications" }
);

qualificationSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Qualification", qualificationSchema);