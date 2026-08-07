import { AuthenticationModel, IAuthenticationModel } from "./Authentication.model.js";
import mongoose, { HydratedDocument } from "mongoose";
import { Profile } from "passport-google-oauth20";
import { RefreshModel } from "../../models/refresh.model.js";
import { NotFoundError } from "../../utils/errors/app.error.js";
import { jwtToken } from "../../utils/helper/jwt.token.js";

export type AuthenticatedUser = HydratedDocument<IAuthenticationModel>;

export interface IAuthenticationService {
    findOrCreateGoogleAccount(profile: Profile): Promise<AuthenticatedUser>;
    findAndDeleteRefreshToken(refreshId: string | mongoose.Types.ObjectId): Promise<boolean>;
    handleRefreshToken(refreshTokenId: string, userId: string): Promise<{ token: string }>;
}

export default class AuthenticationService implements IAuthenticationService {
    constructor() {}

    // find or create google account - for social login
    async findOrCreateGoogleAccount(profile: Profile): Promise<AuthenticatedUser> {
        const user = await AuthenticationModel.findOne({ providerId: profile?.id, provider: "google" });
        if (!user) {
            return await AuthenticationModel.create({
                firstName: profile?.name?.givenName as string,
                lastName: profile?.name?.familyName as string,
                email: profile?.emails?.[0]?.value as string,
                provider: "google",
                providerId: profile?.id as string,
                avatarUrl: profile?.photos?.[0]?.value as string,
            });
        }
        return user;
    }

    async findAndDeleteRefreshToken(userId: string | mongoose.Types.ObjectId): Promise<boolean> {
        const refreshToken = await RefreshModel.findOneAndUpdate(
            {
                userId: userId,
            },
            {
                $unset: {
                    refreshToken: 1,
                },
                $set: {
                    isValid: false,
                },
            },
            {
                returnDocument: "after",
            },
        );
        return refreshToken ? true : false;
    }

    async handleRefreshToken(refreshTokenId: string, userId: string): Promise<{ token: string }> {
        const refreshToken = await RefreshModel.findOne({ _id: refreshTokenId, isValid: true });
        if (!refreshToken) throw new NotFoundError("refresh token not found");

        // first delete refresh token
        await this.findAndDeleteRefreshToken(refreshToken.userId);

        // create new access token and refresh token
        const newRefreshToken = await jwtToken.refreshToken({ id: userId, type: "refresh" });
        const saveRefreshToken = await RefreshModel.create({
            userId: userId,
            refreshToken: newRefreshToken.token,
        });

        const accessToken = jwtToken.accessToken({ id: userId, refreshId: saveRefreshToken._id, type: "access" });
        return { token: accessToken };
    }
}
