const twilio = require("twilio");

// Read credentials securely from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN;
const fromNum    = process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+14155238886";
const toNum      = process.env.TWILIO_WHATSAPP_TO   || "whatsapp:+919966007804";
const contentSid = process.env.TWILIO_CONTENT_SID || "HXb5b62575e6e4ff6129ad7c8efe1f983e";

let client = null;
if (accountSid && authToken) {
  try {
    client = twilio(accountSid, authToken);
  } catch (err) {
    console.error("⚠️ Failed to initialize Twilio client:", err.message);
  }
}

/**
 * Sends a WhatsApp notification to the site owner (+919966007804)
 * whenever a user submits the contact form.
 */
const sendContactNotification = async ({ name, email, mobile, message }) => {
  // Lazy initialize client if env variables exist
  if (!client && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    try {
      client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    } catch {
      // Ignore
    }
  }

  if (!client) {
    console.warn("⚠️ TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not configured in environment. Skipping WhatsApp alert.");
    return null;
  }

  const formattedBody = `📩 *New Contact Form Submission*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📱 *Mobile:* ${mobile}\n💬 *Message:* ${message}`;

  try {
    // Try sending full structured text notification first
    const res = await client.messages.create({
      from: fromNum,
      to: toNum,
      body: formattedBody
    });
    console.log("✅ WhatsApp alert sent successfully to owner! SID:", res.sid);
    return res;
  } catch (err) {
    console.warn("⚠️ Standard WhatsApp message failed, trying Content Template SID:", err.message);
    try {
      const res = await client.messages.create({
        from: fromNum,
        to: toNum,
        contentSid: contentSid,
        contentVariables: JSON.stringify({ "1": String(name), "2": String(mobile) })
      });
      console.log("✅ WhatsApp template alert sent! SID:", res.sid);
      return res;
    } catch (templateErr) {
      console.error("❌ Failed to send WhatsApp alert via Twilio:", templateErr.message);
      return null;
    }
  }
};

module.exports = { sendContactNotification };
