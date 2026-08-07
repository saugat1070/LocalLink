import { z } from "zod";
import type { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger.config.js";
/* 
- @param schema: zod schema to validate the request body
- @returns: middleware function to validate the request body against the provided schema
*/

type ValidateRequestType = "body" | "query" | "params";

export const validateRequest = (schema: z.ZodObject<any>, type: ValidateRequestType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            switch (type) {
                case "body":
                    await schema.parseAsync(req.body);
                    next();
                    break;
                case "query":
                    await schema.parseAsync(req.query);
                    next();
                    break;
                case "params":
                    await schema.parseAsync(req.params);
                    next();
                    break;
            }
        } catch (error: Error | any) {
            logger.error("Validation error", { error: error.message });
            res.status(400).json({
                success: false,
                error: "Invalid request query",
                details: error.errors || error.message,
            });
        }
    }
}

