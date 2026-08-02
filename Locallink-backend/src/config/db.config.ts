import mongoose, { MongooseError } from "mongoose";
import { Env } from "./env.config.js";
import { logger } from "./logger.config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(Env.DB_URL, {
            connectTimeoutMS: 10000,
        });

        mongoose.connection.on("connected", () => {
            logger.info("Database connected successfully");
        });

        mongoose.connection.on("error", (error: Error) => {
            logger.error("Database connection error", { error: error.message });
        });

        mongoose.connection.on("disconnected", async() => {
            logger.info("Database disconnected");
            await mongoose.disconnect();
        });
    } catch (error) {
        if (error instanceof MongooseError) {
            logger.error("Database connection error", { error: error.message });
            process.exit(1);
        }
        throw error;
    }
};
