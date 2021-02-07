const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// config view engine
const viewEngine = require("./config/viewEngine");
viewEngine(app);

// init web routes
const initWebRoutes = require("./routes/web");
initWebRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
