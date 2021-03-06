import * as receiveAPI from "../messenger-api-helpers/receive";
import { Request, Response } from "express";

export const chatbotController = {
  test: (req: Request, res: Response): void => {
    res.send("Hello again");
    return;
  },

  // Adds support for GET requests to our webhook
  getWebhook: (req: Request, res: Response): void => {
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
  postWebhook: (req: Request, res: Response): void => {
    // Checks this is an event from a page subscription
    if (req.body.object === "page") {
      // Iterates over each entry - there may be multiple if batched
      req.body.entry.forEach((entry: any) => {
        // Gets the body of the webhook event
        const webhook_event = entry.messaging[0];
        // console.log(webhook_event);

        // Get the sender PSID
        const senderPsid = webhook_event.sender.id;
        // console.log("Sender PSID: " + senderPsid);

        // Check if the event is a message or postback and
        // pass the event to the appropriate handler function
        if (webhook_event.message) {
          receiveAPI.handleReceiveMessage(senderPsid, webhook_event.message);
        } else if (webhook_event.postback) {
          receiveAPI.handleReceivePostback(senderPsid, webhook_event.postback);
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
