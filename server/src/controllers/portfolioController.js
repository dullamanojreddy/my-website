const { getProfile, getSkills, getProjects, getCertificates } = require("../services/portfolioService");
const asyncWrapper = require("../utils/asyncWrapper");

const getProfileHandler = asyncWrapper(async (req, res) => {
  const profile = await getProfile();
  res.json({ success: true, data: profile });
});

const getSkillsHandler = asyncWrapper(async (req, res) => {
  const skills = await getSkills();
  res.json({ success: true, data: skills });
});

const getProjectsHandler = asyncWrapper(async (req, res) => {
  const projects = await getProjects();
  res.json({ success: true, data: projects });
});

const getCertificatesHandler = asyncWrapper(async (req, res) => {
  const certificates = await getCertificates();
  res.json({ success: true, data: certificates });
});

module.exports = {
  getProfileHandler,
  getSkillsHandler,
  getProjectsHandler,
  getCertificatesHandler
};