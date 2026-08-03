import passport from "passport";
import { Strategy as GoogleStrategy,type VerifyCallback,type Profile } from "passport-google-oauth20";
import { OAuthEnv } from "../../config/env.config.js";
import { logger } from "../../config/logger.config.js";
import { authenticationService } from "../../modules/Authentication/index.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: OAuthEnv.GOOGLE_CLIENT_ID,
            clientSecret: OAuthEnv.GOOGLE_CLIENT_SECRET,
            callbackURL: OAuthEnv.GOOGLE_CALLBACK,
            scope: ["email", "profile"]
        },
        async function (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
            try {
                const user = await authenticationService.findOrCreateGoogleAccount(profile);
                done(null, user);
            } catch (error: Error | any) {
                logger.error("Error in google strategy", {error: error.message});
                done(error);
            }
        },
    )
);
