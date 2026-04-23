const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    tagline: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    about: { type: [String], required: true },
    photoPath: { type: String, default: "/assets/myphoto.jpg" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema, "profile");
