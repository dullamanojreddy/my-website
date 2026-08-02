const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Message = require("../models/Message");

const isDatabaseReady = () => mongoose.connection.readyState === 1;

const createMessage = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!isDatabaseReady()) {
    return res.status(503).json({
      success: false,
      message: "Message service is temporarily unavailable. Please try again later."
    });
  }

  const { name, email, mobile, message } = req.body;

  try {
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
  } catch (error) {
    console.error("Failed to save contact message:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to submit your message. Please try again later."
    });
  }
};

module.exports = {
  createMessage
};
