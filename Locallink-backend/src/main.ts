import express from "express";
import v1Router from "./Routers/v1/index.router.js";
import v2Router from "./Routers/v2/index.router.js";
import { attachCorrelationId } from "./middleware/correlation.middleware.js";
import "./utils/oauthStrategy/index.js";
import { appErrorHandler, genericErrorHandler } from "./middleware/error.middleware.js";
import passport from "passport";
import { corsMiddleware } from "./config/cors.config.js";
import { socketMiddleware } from "./middleware/socket.middleware.js";
// instance of express application
export const app: express.Application = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(corsMiddleware);

// passport initialization
app.use(passport.initialize());

// Middleware to attach correlation ID to each request
app.use(attachCorrelationId);

// Registering API version routers
app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);

// middleware for handling errors
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(attachCorrelationId);

