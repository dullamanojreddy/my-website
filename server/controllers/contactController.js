const { validationResult } = require("express-validator");
const Message = require("../models/Message");

const createMessage = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, mobile, message } = req.body;

  const savedMessage = await Message.create({
    name,
    email,
    mobile,
    message
  });

  return res.status(201).json({
    success: true,
    message: "Contact details submitted successfully.",
    data: savedMessage
  });
};

module.exports = {
  createMessage
};
