import { Request, Response, NextFunction } from "express";
import { JsonResponse } from "../utils/helper/response.helper.js";
import { jwtToken } from "../utils/helper/jwt.token.js";
import { AuthenticationModel } from "../modules/Authentication/Authentication.model.js";
import { logger } from "../config/logger.config.js";

const tokenFromHeader = (req: Request) => {
    const token = req.headers.authorization as string;
    return token.startsWith("Bearer ") ? token.split("Bearer ")[1] : token;
};

export default  function AuthMiddleware(ignoreExpired = false) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = tokenFromHeader(req);
            if (!token) {
                return JsonResponse(res, 401, false, "you are not authenticate yet, please login first", { error: "token not found" });
            }

            const decodedValue = await jwtToken.decodeToken(token, "access", ignoreExpired);
            if (!decodedValue?.id) {
                return JsonResponse(res, 401, false, "you are not authenticate yet, please login first", { error: "invalid token" });
            }
            const user = await AuthenticationModel.findById(decodedValue.id).select("-password");
            if (!user) {
                return JsonResponse(res, 401, false, "you are not authenticate yet, please login first", { error: "user not found" });
            }
            req.refreshId = decodedValue.refreshId;
            req.user = user;
            req.userId = user._id;
            next();
        } catch (error: Error | any) {
            logger.error("Error at auth middleware", { error: error.message });
            return JsonResponse(res, 401, false, "you are not authenticate yet, please login first", { error: error.message });
        }
    };
}
