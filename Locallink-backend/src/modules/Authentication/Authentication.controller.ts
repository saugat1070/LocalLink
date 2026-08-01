import { Request, Response } from "express";
import { ForbiddenError, NotFoundError } from "../../utils/errors/app.error.js";
import { IAuthenticationService } from "./Authentication.service.js";
import { Profile } from "passport-google-oauth20";
import { Env } from "../../config/env.config.js";
import { jwtToken } from "../../utils/helper/jwt.token.js";
import { JsonResponse } from "../../utils/helper/response.helper.js";
// abstract class for authentication controller
interface IAuthenticationController {
    googleCallback(req: Request, res: Response): Promise<void>;
    logout(req: Request, res: Response): Promise<void>;
}

class AuthenticationController implements IAuthenticationController {
    private readonly authenticationService: IAuthenticationService;
    constructor(private readonly authentication_service: IAuthenticationService) {
        this.authenticationService = authentication_service;
    }

    async googleCallback(req: Request, res: Response): Promise<void> {
        // generate accesstoken and save in cookie
        if (!req.userId || !req.user) throw new NotFoundError("you are not authenticate yet, please login first");

        const user = await this.authenticationService.findOrCreateGoogleAccount(req.user as Profile);
        if (!user) {
            throw new ForbiddenError("sorry to login with google, please try again.");
        }

        // generate accesstoken and refreshtoken
        const refreshToken = await jwtToken.refreshToken({ id: user._id, type: "refresh" });
        const accessToken = jwtToken.accessToken({ id: user._id, refreshId: refreshToken?.refreshTokenId, type: "access" });

        // redirect to auth success page
        res.redirect(`${Env.NODE_CLIENT_URL}/auth/?token=${accessToken}&createdAt=${Date.now()}/success`);
    }
    async logout(req: Request, res: Response): Promise<void> {
        const refreshToken = await this.authenticationService.findAndDeleteRefreshToken(req.userId);
        if (!refreshToken) throw new ForbiddenError("failed to logout");
        JsonResponse(res, 200, true, "logout successful");
    }
}

export default AuthenticationController;
