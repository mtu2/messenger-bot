// Display a typing indicator in the conversation via the Send API
module.exports = async (sender_psid) => {
  const requestBody = {
    recipient: { id: sender_psid },
    sender_action: "typing_on",
  };
  try {
    await axios.post(
      `https://graph.facebook.com/v9.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
      requestBody
    );
    console.log("Message sent.");
  } catch (err) {
    console.error("Unable to send message: " + err);
  }
};
