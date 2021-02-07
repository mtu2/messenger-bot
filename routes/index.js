const router = require("express").Router();
const webhookRoutes = require("./webhookRoutes");
const chatbotController = require("../controllers/chatbotController");

router.get("/", chatbotController.test);

router.use("/webhook", webhookRoutes);

module.exports = router;
