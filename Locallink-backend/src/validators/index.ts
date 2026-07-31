import { z } from "zod";
import type { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger.config.js";
/* 
- @param schema: zod schema to validate the request body
- @returns: middleware function to validate the request body against the provided schema
*/
export const validateRequestBody = (schema: z.ZodObject<any>) => {
    return  async (req:Request, res:Response, next:NextFunction)=>{
        try{
            await schema.parseAsync(req.body);
            next();
        } catch(error: Error | any){
            logger.error("Validation error", {error: error.message});
            res.status(400).json({
                success: false,
                error: "Invalid request body",
                details: error.errors || error.message
            });
        }
    }
}

export const validateRequestQuery = (schema: z.ZodObject<any>) => {
    return async (req:Request, res:Response, next:NextFunction)=>{
        try {
            await schema.parseAsync(req.query);
            next();
        } catch (error: Error | any) {
            logger.error("Validation error", {error: error.message});
            res.status(400).json({
                success: false,
                error: "Invalid request query",
                details: error.errors || error.message
            });
        }
    }
}
