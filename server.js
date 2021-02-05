const express = require("express");
const morgan = require("morgan"); // http request logger middleware

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev")); // log every request to console
app.use(express.json());
app.use(cors());

require("./routes/webhookVerify")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
