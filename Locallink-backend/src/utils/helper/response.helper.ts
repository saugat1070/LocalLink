import { Response } from "express";
import { IPagination } from "../../@types/interface/pagination.interface.js";

export function JsonResponse(
    res: Response,
    statusCode: number | string,
    success: boolean,
    message: string,
    data?: any,
    pagination ?: IPagination ,
){
    return res.status(statusCode as number).json({
        success,
        message,
        data,
        pagination
    })
}

