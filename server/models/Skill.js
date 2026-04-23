const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    proficiency: { type: Number, required: true, min: 0, max: 100 },
    icon: { type: String, default: "code" },
    category: { type: String, default: "General" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema, "skills");
