import { Router } from "express";
import { instanceUserController } from "./index.js";
import { validateRequest } from "../../validators/index.js";
import { RoomParamsValidation } from "./User.validation.js";
import { RequestBodyType } from "../../@types/enums/index.js";
import AuthMiddleware from "../../middleware/auth.middleware.js";
export const userRouter: Router = Router();

userRouter.route("/:roomId/add").post(AuthMiddleware(),validateRequest(RoomParamsValidation,RequestBodyType.Params),instanceUserController.addMemberToRoom.bind(instanceUserController));
userRouter.route("/:roomId/remove").post(AuthMiddleware(),validateRequest(RoomParamsValidation,RequestBodyType.Params),instanceUserController.removeMemberFromRoom.bind(instanceUserController));
