const { createMessage } = require("../services/messageService");
const { sendContactNotification } = require("../services/whatsappService");
const asyncWrapper = require("../utils/asyncWrapper");

const createContactMessage = asyncWrapper(async (req, res) => {
  const { name, email, mobile, message } = req.body;

  const saved = await createMessage({ name, email, mobile, message });

  // Trigger WhatsApp notification asynchronously (won't block HTTP response)
  sendContactNotification({ name, email, mobile, message }).catch((err) => {
    console.error("WhatsApp notification error:", err.message);
  });

  res.status(201).json({
    success: true,
    message: "Message received successfully.",
    data: saved
  });
});

module.exports = {
  createContactMessage
};