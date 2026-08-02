const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    techStack: { type: [String], default: [] },
    demoUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    emoji: { type: String, default: "🚀" }
  },
  { timestamps: true, collection: "projects" }
);

projectSchema.index({ featured: -1, createdAt: -1 });

module.exports = mongoose.model("Project", projectSchema);