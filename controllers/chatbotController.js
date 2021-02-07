const request = require("request");
const axios = require("axios");

module.exports = {
  test: (req, res) => {
    return res.send("Hello again");
  },

  // Adds support for GET requests to our webhook
  getWebhook: (req, res) => {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    // Parse the query params
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Checks the mode and token sent is correct
      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        // Responds with the challenge token from the request
        console.log("Webhook verified.");
        res.status(200).send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        console.error("Verification failed. Token mismatch.");
        res.sendStatus(403);
      }
    }
  },
  // Creates the endpoint for our webhook
  postWebhook: (req, res) => {
    // Checks this is an event from a page subscription
    if (req.body.object === "page") {
      // Iterates over each entry - there may be multiple if batched
      req.body.entry.forEach((entry) => {
        // Gets the body of the webhook event
        const webhook_event = entry.messaging[0];
        console.log(webhook_event);

        // Get the sender PSID
        const sender_psid = webhook_event.sender.id;
        console.log("Sender PSID: " + sender_psid);

        // Check if the event is a message or postback and
        // pass the event to the appropriate handler function
        if (webhook_event.message) {
          handleMessage(sender_psid, webhook_event.message);
        } else if (webhook_event.postback) {
          handlePostback(sender_psid, webhook_event.postback);
        }
      });

      // Returns a '200 OK' response to all requests
      res.status(200).send("EVENT_RECEIVED");
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  },
};

/* HANDLER FUNCTIONS */
// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === "yes") {
    response = { text: "Thanks!" };
  } else if (payload === "no") {
    response = { text: "Oops, try sending another image." };
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}
// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response;

  // Checks if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      text: `You sent the message: "${received_message.text}". Now send me an attachment!`,
    };
  } else if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    //gets first attachment for quick start - would iterate through array for real bot
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Is this the right picture?",
              subtitle: "Tap a button to answer.",
              image_url: attachment_url,
              buttons: [
                {
                  type: "postback",
                  title: "Yes!",
                  payload: "yes",
                },
                {
                  type: "postback",
                  title: "No!",
                  payload: "no",
                },
              ],
            },
          ],
        },
      },
    };
  }

  // Send the response message
  callSendAPI(sender_psid, response);
}

async function callSendAPI(sender_psid, response) {
  // Construct the message body
  const request_body = {
    messaging_type: "RESPONSE",
    recipient: { id: sender_psid },
    message: response,
  };
  try {
    // Send the HTTP request to the Messenger Platform
    await axios.post(
      `https://graph.facebook.com/v9.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`
    );
    console.log("Message sent.");
  } catch (err) {
    console.error("Unable to send message: " + err);
  }
}

// Sends response messages via the Send API
// function callSendAPI(sender_psid, response) {
//   // Construct the message body
//   const request_body = {
//     messaging_type: "RESPONSE",
//     recipient: { id: sender_psid },
//     message: response,
//   };

//   request(
//     {
//       uri: "https://graph.facebook.com/v7.0/me/messages",
//       qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
//       method: "POST",
//       json: request_body,
//     },
//     (err, res, body) => {
//       if (!err) {
//         console.log("message sent!");
//       } else {
//         console.error("Unable to send message:" + err);
//       }
//     }
//   );
// }
