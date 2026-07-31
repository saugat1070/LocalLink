import dotenv from "dotenv";
import { logger } from "./logger.config.js";

dotenv.config({
    path: ".env"
});

interface EnvConfig {
    PORT: number,
    NODE_ENV: string
}
logger.info("Environment variables loaded successfully");
export const Env : EnvConfig = {
    PORT: Number(process.env.PORT) || 3000,
    NODE_ENV: process.env.NODE_ENV || "development"
}