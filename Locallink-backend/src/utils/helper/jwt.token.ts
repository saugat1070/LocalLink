import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Env } from "../../config/env.config.js";
import { RefreshModel } from "../../models/refresh.model.js";

export interface TokenPayload {
    id: string | mongoose.Types.ObjectId;
    type: "access" | "refresh";
    refreshId?: string | mongoose.Types.ObjectId;
    data?: any;
}

export const jwtToken = {
    // refresh token for long term login
    async refreshToken(payload: TokenPayload): Promise<{ token: string; refreshTokenId: string | mongoose.Types.ObjectId }> {
        const token = jwt.sign(payload, Env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: "15d" });
        const refreshToken = await RefreshModel.create({
            userId: payload.id,
            refreshToken: token,
        });
        return { token, refreshTokenId: refreshToken._id };
    },
    // access token for short term login
    accessToken(payload: TokenPayload): string {
        return jwt.sign(payload, Env.JWT_SECRET_ACCESS_TOKEN, { expiresIn: "10m" });
    },

    async decodeToken(token: string, type: "access" | "refresh"): Promise<TokenPayload> {
        return jwt.verify(token, type === "access" ? Env.JWT_SECRET_ACCESS_TOKEN : Env.JWT_SECRET_REFRESH_TOKEN) as TokenPayload;
    }
};
