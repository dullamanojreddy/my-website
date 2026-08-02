const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    proficiency: { type: Number, min: 0, max: 100, default: 0 },
    icon: { type: String, default: "code" },
    category: { type: String, default: "General" },
    points: { type: [String], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema, "skills");
