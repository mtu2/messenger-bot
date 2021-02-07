const router = require("express").Router();
const chatbotController = require("../controllers/chatbotController");

router
  .route("/")
  .get(chatbotController.getWebhook)
  .post(chatbotController.postWebhook);

module.exports = router;
