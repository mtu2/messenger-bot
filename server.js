const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); // http request logger middleware
const viewEngine = require("./config/viewEngine");
const initWebRoutes = require("./routes/web");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// config view engine
viewEngine(app);

// init web routes
initWebRoutes(app);

app.use(morgan("dev")); // log every request to console
app.use(express.json());
app.use(cors());

// require("./routes/webhookVerify")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
