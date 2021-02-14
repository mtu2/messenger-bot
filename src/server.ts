import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { configViewEngine } from "./config/viewEngine";
import { routes } from "./routes";
import { threadSetup } from "./messenger-api-helpers/thread-setup";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure body parser for AJAX requests
app.use(express.json());
app.use(cors());

// config view engine
configViewEngine(app);

// import routes
app.use(routes);

// messenger setup
threadSetup.setPersistentMenu();
threadSetup.setGetStarted();

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
