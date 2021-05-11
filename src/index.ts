import express from "express";

import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import debug from "debug";

import dotenv from "dotenv";
import { connect } from "mongoose";

import { UsersRoutes } from "./users/users.routes.config";
import { CommonRoutesConfig } from "./common/common.routes.config";

dotenv.config();

const app: express.Application = express();
const port = 8080;
const debugLog: debug.IDebugger = debug("app");

const routes: Array<CommonRoutesConfig> = [];

// here we are adding middleware to parse all incoming requests as JSON
app.use(express.json());

app.use(cors());

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

routes.push(new UsersRoutes(app));

// this is a simple route to make sure everything is working properly
const runningMessage = `Server running at http://localhost:${port}`;
app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage);
});

connect(process.env.MONGODB_URL!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((_) => {
  app.listen(port);
  console.log(`listening on port: ${port}`);
});
