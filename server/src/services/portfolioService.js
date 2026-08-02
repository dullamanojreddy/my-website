const mongoose = require("mongoose");
const Profile = require("../models/Profile");
const Skill = require("../models/Skill");
const Project = require("../models/Project");
const Certificate = require("../models/Certificate");
const fallbackData = require("./portfolioFallbackData");

const isDatabaseReady = () => mongoose.connection.readyState === 1;

const readCollection = async (model, sort, fallback) => {
  if (!isDatabaseReady()) {
    return fallback;
  }

  try {
    const items = await model.find().sort(sort).lean();
    return items.length > 0 ? items : fallback;
  } catch (error) {
    console.warn(`Falling back to bundled data for ${model.modelName}:`, error.message);
    return fallback;
  }
};

const getProfile = async () => {
  if (!isDatabaseReady()) {
    return fallbackData.profile;
  }

  try {
    const profile = await Profile.findOne().sort({ createdAt: -1 }).lean();
    return profile || fallbackData.profile;
  } catch (error) {
    console.warn("Falling back to bundled data for Profile:", error.message);
    return fallbackData.profile;
  }
};

const getSkills = () =>
  readCollection(Skill, { proficiency: -1 }, fallbackData.skills);

const getProjects = () =>
  readCollection(Project, { featured: -1, createdAt: -1 }, fallbackData.projects);

const getCertificates = () =>
  readCollection(Certificate, { createdAt: -1 }, fallbackData.certifications);

module.exports = {
  getProfile,
  getSkills,
  getProjects,
  getCertificates
};