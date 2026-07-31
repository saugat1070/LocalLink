import { Response } from "express";
import { IPagination } from "../../@types/interface/pagination.interface.js";

export function JsonResponse(
    res: Response,
    statusCode: number,
    success: boolean,
    message: string,
    data?: any,
    pagination ?: IPagination ,
){
    return res.status(statusCode).json({
        success,
        message,
        data,
        pagination
    })
}

