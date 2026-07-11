const mongoose = require("mongoose");
const Profile = require("../models/Profile");
const Skill = require("../models/Skill");
const Project = require("../models/Project");
const Qualification = require("../models/Qualification");
const Certification = require("../models/Certification");
const fallbackData = require("../config/portfolioFallbackData");

const isDatabaseReady = () => mongoose.connection.readyState === 1;

const readCollection = async (model, sort, fallback) => {
  if (!isDatabaseReady()) {
    return fallback;
  }

  try {
    const items = await model.find().sort(sort).lean();
    return items.length > 0 ? items : fallback;
  } catch (error) {
    console.warn(`Falling back to bundled portfolio data for ${model.modelName}:`, error.message);
    return fallback;
  }
};

const getProfile = async (req, res) => {
  if (!isDatabaseReady()) {
    return res.json(fallbackData.profile);
  }

  try {
    const profile = await Profile.findOne().sort({ createdAt: -1 }).lean();
    res.json(profile || fallbackData.profile);
  } catch (error) {
    console.warn("Falling back to bundled portfolio data for Profile:", error.message);
    res.json(fallbackData.profile);
  }
};

const getSkills = async (req, res) => {
  const skills = await readCollection(Skill, { proficiency: -1 }, fallbackData.skills);
  res.json(skills);
};

const getProjects = async (req, res) => {
  const projects = await readCollection(Project, { featured: -1, createdAt: -1 }, fallbackData.projects);
  res.json(projects);
};

const getQualifications = async (req, res) => {
  const qualifications = await readCollection(Qualification, { createdAt: 1 }, fallbackData.qualifications);
  res.json(qualifications);
};

const getCertifications = async (req, res) => {
  const certifications = await readCollection(Certification, { createdAt: -1 }, fallbackData.certifications);
  res.json(certifications);
};

module.exports = {
  getProfile,
  getSkills,
  getProjects,
  getQualifications,
  getCertifications
};
