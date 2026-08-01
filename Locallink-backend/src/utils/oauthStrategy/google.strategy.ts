import passport from "passport";
import { Strategy as GoogleStrategy,type VerifyCallback,type Profile } from "passport-google-oauth20";
import { OAuthEnv } from "../../config/env.config.js";
import { logger } from "../../config/logger.config.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: OAuthEnv.GOOGLE_CLIENT_ID,
            clientSecret: OAuthEnv.GOOGLE_CLIENT_SECRET,
            callbackURL: OAuthEnv.GOOGLE_CALLBACK,
            scope: ["email", "profile"]
        },
        function (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
            try {
                // Todo: logics for handling authentication
            } catch (error: Error | any) {
                logger.error("Error in google strategy", {error: error.message});
                done(error);
            }
        },
    )
);
