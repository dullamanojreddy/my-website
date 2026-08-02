const express = require("express");
const {
  getProfileHandler,
  getSkillsHandler,
  getProjectsHandler,
  getCertificatesHandler
} = require("../controllers/portfolioController");

const router = express.Router();

router.get("/profile", getProfileHandler);
router.get("/skills", getSkillsHandler);
router.get("/projects", getProjectsHandler);
router.get("/certifications", getCertificatesHandler);

module.exports = router;