import { Request,Response,NextFunction, RequestHandler, ErrorRequestHandler } from "express";
import { JsonResponse } from "../utils/helper/response.helper.js";
import { AppError } from "../utils/errors/app.error.js";

export const appErrorHandler:ErrorRequestHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.log("Error occurred: ", err);
    JsonResponse(res, err.statusCode, false, err.message, null);
}

export const genericErrorHandler:ErrorRequestHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.log("Generic error occurred: ", err);
    JsonResponse(res, err.statusCode, false, err.message, null);
}