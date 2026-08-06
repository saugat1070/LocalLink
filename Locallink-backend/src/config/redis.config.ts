import { Redis } from "ioredis";
import { logger } from "./logger.config.js";

export const redisClient = new Redis({
    host: "127.0.0.1",
    port: 6379,
    retryStrategy: (times: number) => {
        return times > 5 ? null : 200;
    },
    maxRetriesPerRequest: 10,
});


redisClient.on("connect", () => {
    logger.info("Redis client connected");
});

redisClient.on("error", (error: Error) => {
    logger.error("Redis client error", { error: error.message });
});

redisClient.on("reconnecting", () => {
    logger.info("Redis client reconnecting");
});