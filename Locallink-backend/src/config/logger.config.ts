import winston from "winston";
import { getCorrelationId } from "../utils/helper/request.helper.js";

export const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        winston.format.json(), // Format the log message as json

        winston.format.printf((
            {timestamp, level, message, ...data}
        )=>{
            return `${level} | ${message} | ${timestamp} | ${getCorrelationId()} | ${JSON.stringify(data)}`
            }
        )
    ),
    transports: [
        new winston.transports.Console()
    ]
})