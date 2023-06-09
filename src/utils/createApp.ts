import express, { Express } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import routes from "../routes";
import session from "express-session";

export function createApp(): Express {
  const app = express();

  const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };

  // Enable Parsing Middleware for Requests
  app.use(express.json());
  app.use(express.urlencoded());

  // Enable CORS
  app.use(cors(corsOptions));

  app.use(
    session({
      secret: "qwepqowiepqoweipqowie",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000 * 60 * 24 * 7,
      },
    })
  );

  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.json());

  app.use("/api", routes);
  return app;
}
