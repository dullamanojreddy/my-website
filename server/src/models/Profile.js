const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    tagline: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    mobile: { type: String, required: true, trim: true },
    about: { type: [String], required: true },
    photoPath: { type: String, default: "/assets/myphoto.jpg" }
  },
  { timestamps: true, collection: "profile" }
);

module.exports = mongoose.model("Profile", profileSchema);