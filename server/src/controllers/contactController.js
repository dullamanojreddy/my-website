const { createMessage } = require("../services/messageService");
const asyncWrapper = require("../utils/asyncWrapper");

const createContactMessage = asyncWrapper(async (req, res) => {
  const { name, email, mobile, message } = req.body;

  const saved = await createMessage({ name, email, mobile, message });

  res.status(201).json({
    success: true,
    message: "Message received successfully.",
    data: saved
  });
});

module.exports = {
  createContactMessage
};