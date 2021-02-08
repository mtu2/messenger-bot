const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure body parser for AJAX requests
app.use(express.json());
app.use(cors());

// config view engine
const viewEngine = require("./config/viewEngine");
viewEngine(app);

// import routes
const routes = require("./routes");
app.use(routes);

// messenger setup
const threadSetup = require("./messenger-api-helpers/thread-setup");
threadSetup.setPersistentMenu();
threadSetup.setGetStarted();

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
