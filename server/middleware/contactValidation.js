const { body } = require("express-validator");

const contactValidationRules = [
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email address."),
  body("mobile")
    .trim()
    .notEmpty()
    .withMessage("Mobile number is required.")
    .bail()
    .matches(/^\d{10}$/)
    .withMessage("Mobile number must be exactly 10 digits."),
  body("message").trim().notEmpty().withMessage("Message is required.")
];

module.exports = {
  contactValidationRules
};
