import express from "express";
import { webhookRoutes } from "./webhookRoutes";
import { chatbotController } from "../controllers/chatbotController";

const router = express.Router();

router.get("/", chatbotController.test);
router.use("/webhook", webhookRoutes);

export { router as routes };
