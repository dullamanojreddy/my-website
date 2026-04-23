const express = require("express");
const {
  getProfile,
  getSkills,
  getProjects,
  getQualifications,
  getCertifications
} = require("../controllers/portfolioController");

const router = express.Router();

router.get("/profile", getProfile);
router.get("/skills", getSkills);
router.get("/projects", getProjects);
router.get("/qualifications", getQualifications);
router.get("/certifications", getCertifications);

module.exports = router;
