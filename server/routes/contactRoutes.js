const express = require("express");
const { createMessage } = require("../controllers/contactController");
const { contactValidationRules } = require("../middleware/contactValidation");

const router = express.Router();

router.post("/contact", contactValidationRules, createMessage);

module.exports = router;
