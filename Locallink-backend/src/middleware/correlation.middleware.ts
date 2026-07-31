import {NextFunction, Request,Response, RequestHandler} from "express";
import { asyncLocalStorage } from "../utils/helper/request.helper.js";
import {v4 as uuidv4} from "uuid";

export const attachCorrelationId: RequestHandler = (req:Request,res:Response,next:NextFunction) => {
    // generate correlation id
    const correlationId = uuidv4();

    // attach correlation id to request object
    req.headers['x-correlation-id'] = correlationId;

    asyncLocalStorage.run({correlationId: correlationId}, () => {
        next();
    });
}