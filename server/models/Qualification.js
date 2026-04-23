const mongoose = require("mongoose");

const qualificationSchema = new mongoose.Schema(
  {
    education: { type: String, required: true },
    institution: { type: String, required: true },
    score: { type: String, required: true },
    status: { type: String, enum: ["Pass", "Distinction"], required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Qualification", qualificationSchema, "qualifications");
