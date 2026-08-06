import { NextFunction } from "express";
import { Socket } from "socket.io";
import { NotFoundError } from "../utils/errors/app.error.js";
import jwt from "jsonwebtoken";
import { Env } from "../config/env.config.js";
import { AuthenticationModel, IAuthenticationModel } from "../modules/Authentication/Authentication.model.js";
import { jwtToken } from "../utils/helper/jwt.token.js";
import mongoose from "mongoose";

export interface SocketPayLoad {
    _id: string | mongoose.Types.ObjectId;
    socketId: string;
    roomId: string;
    user: Partial<IAuthenticationModel>;
}

export const socketMiddleware = async (socket: Socket, next: any) => {
    try {
        const authBearerToken = socket.handshake.headers.authorization as string;
        const authToken = authBearerToken?.startsWith("Bearer ") ? authBearerToken.split("Bearer ")[1] : authBearerToken;

        // handshake auth token
        const handShaketoken = socket.handshake.auth.token;
        const token = authToken || handShaketoken;

        if (!token) return next(new NotFoundError("Token not found"));

        const decodedValue = await jwtToken.decodeToken(token, "access");
        const user = await AuthenticationModel.findOne({ _id: decodedValue?.id }).select("-password");
        if (!user) return next(new NotFoundError("User not found"));
        socket.data._id = user._id;
        socket.data.user = user;
        next();
    } catch (error: Error | any) {
        next(new Error(`Error at socket middleware: ${error?.message}`));
    }
};
