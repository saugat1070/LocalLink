import dotenv from "dotenv";
import { logger } from "./logger.config.js";

dotenv.config({
    path: ".env"
});

type NodeEnv = "production" | "development" | "test";
interface EnvConfig {
    PORT: number;
    NODE_ENV: NodeEnv;
    DB_URL: string;
    NODE_CLIENT_URL: string;
    JWT_SECRET_ACCESS_TOKEN : string;
    JWT_SECRET_REFRESH_TOKEN : string;
}

logger.info("Environment variables loaded successfully");
export const Env : EnvConfig = {
    PORT: Number(process.env.PORT) || 3000,
    NODE_ENV: process.env.NODE_ENV as NodeEnv || "development",
    DB_URL: process.env.DB_URL || "",
    NODE_CLIENT_URL: process.env.NODE_CLIENT_URL || "",
    JWT_SECRET_ACCESS_TOKEN: process.env.JWT_SECRET_ACCESS_TOKEN || "",
    JWT_SECRET_REFRESH_TOKEN: process.env.JWT_SECRET_REFRESH_TOKEN || ""
}

export const OAuthEnv = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
    GOOGLE_CALLBACK: process.env.GOOGLE_CALLBACK || ""
}

export function getEnv(key: string): string {
    return process.env[key] || "";
}