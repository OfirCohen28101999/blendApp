require("dotenv").config();
import express, { Express, NextFunction, Request, Response } from "express";

import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import morgan from "morgan";
import config from "config";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import sessionRouter from "./routes/session.route";
import connectDB from "./utils/connect-to-DB";
import { initilizeSongsTableByPlaylists } from "./utils/init-songs";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blend API",
      version: "1.0.0",
      description: "Blend app API documentation",
    },
    servers: [
      {
        url: `http://localhost:${config.get<number>("port")}`,
      },
    ],
  },
  // apis: ["./src/routes/*.ts"],
  apis: ["./src/*.ts", "./src/routes/*.ts"],
};

const initApp = (): Promise<Express> => {
  const promise = new Promise<Express>((resolve) => {
    connectDB().then(() => {
      const app = express();
      // app.use(bodyParser.json());
      // app.use(bodyParser.urlencoded({ extended: true }));

      // Middleware

      // 1. Body Parser
      app.use(express.json({ limit: "10kb" }));

      // 2. Cookie Parser
      app.use(cookieParser());

      // 3. Cors
      app.use(
        cors({
          origin: config.get<string>("origin"),
          credentials: true,
        })
      );

      // 4. Logger
      if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

      // swagger
      const swaggerDocs = swaggerJsDoc(swaggerOptions);
      app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

      // Routes
      app.use("/api/auth/session", sessionRouter);
      app.use("/api/users", userRouter);
      app.use("/api/auth", authRouter);

      /**
       * @swagger
       *
       * /api/healthChecker:
       *   get:
       *     summary: simple health check for the server
       */
      app.get(
        "/api/healthChecker",
        (req: Request, res: Response, next: NextFunction) => {
          res.status(200).json({
            status: "success",
            message: "Welcome to the Blend app server! :)",
          });
        }
      );

      /**
       * @swagger
       * /:
       *   get:
       *     summary:  fallback for unknown/not supported routes
       */
      app.all("*", (req: Request, res: Response, next: NextFunction) => {
        const err = new Error(`Route ${req.originalUrl} not found`) as any;
        err.statusCode = 404;
        next(err);
      });

      // initilize songs
      initilizeSongsTableByPlaylists(
        config.get<string>("initializationPlaylistIds").split(","),
        config.get<string>("rapidApiKey"),
        config.get<string>("rapidApiHost")
      );

      // Global Error Handler
      app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        err.status = err.status || "error";
        err.statusCode = err.statusCode || 500;

        res.status(err.statusCode).json({
          status: err.status,
          message: err.message,
        });
      });

      resolve(app);
    });
  });
  return promise;
};

export default initApp;
