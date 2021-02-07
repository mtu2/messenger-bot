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

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
