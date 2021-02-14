import express from "express";
import { chatbotController } from "../controllers/chatbotController";

const router = express.Router();

router
  .route("/")
  .get(chatbotController.getWebhook)
  .post(chatbotController.postWebhook);

export { router as webhookRoutes };
