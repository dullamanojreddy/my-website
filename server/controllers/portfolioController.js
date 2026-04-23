const Profile = require("../models/Profile");
const Skill = require("../models/Skill");
const Project = require("../models/Project");
const Qualification = require("../models/Qualification");
const Certification = require("../models/Certification");

const getProfile = async (req, res) => {
  const profile = await Profile.findOne().sort({ createdAt: -1 }).lean();
  res.json(profile || {});
};

const getSkills = async (req, res) => {
  const skills = await Skill.find().sort({ proficiency: -1 }).lean();
  res.json(skills);
};

const getProjects = async (req, res) => {
  const projects = await Project.find().sort({ featured: -1, createdAt: -1 }).lean();
  res.json(projects);
};

const getQualifications = async (req, res) => {
  const qualifications = await Qualification.find().sort({ createdAt: 1 }).lean();
  res.json(qualifications);
};

const getCertifications = async (req, res) => {
  const certifications = await Certification.find().sort({ createdAt: -1 }).lean();
  res.json(certifications);
};

module.exports = {
  getProfile,
  getSkills,
  getProjects,
  getQualifications,
  getCertifications
};
