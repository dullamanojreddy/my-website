const Message = require("../models/Message");
const ApiError = require("../utils/ApiError");

const createMessage = async ({ name, email, mobile, message }) => {
  if (!name || !email || !mobile || !message) {
    throw new ApiError("All fields are required.", 400);
  }

  const payload = {
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    mobile: String(mobile).trim(),
    message: String(message).trim()
  };

  const saved = await Message.create(payload);
  return saved;
};

module.exports = {
  createMessage
};