// Sends response messages via the Send API
module.exports = async (sender_psid, response) => {
  // Construct the message body
  const requestBody = {
    messaging_type: "RESPONSE",
    recipient: { id: sender_psid },
    message: response,
  };
  try {
    // Send the HTTP request to the Messenger Platform
    await axios.post(
      `https://graph.facebook.com/v9.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
      requestBody
    );
    console.log("Message sent.");
  } catch (err) {
    console.error("Unable to send message: " + err);
  }
};
