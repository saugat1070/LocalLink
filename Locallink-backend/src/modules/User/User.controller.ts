import { Request, Response } from "express";
import { IUserService } from "./User.service.js";
import { JsonResponse } from "../../utils/helper/response.helper.js";
import { ForbiddenError } from "../../utils/errors/app.error.js";
export interface IUserController {
    addMemberToRoom(req: Request, res: Response): Promise<void>;
    removeMemberFromRoom(req: Request, res: Response): Promise<void>;
}

export class UserController implements IUserController {
    private userService: IUserService;
    constructor(private user_service: IUserService) {
        this.userService = user_service;
    }

    async addMemberToRoom(req: Request, res: Response): Promise<void> {
        const { roomId } = req.params;
        const userId = req.userId;
        const result = await this.userService.addMemberToRoom(userId, roomId as string);
        if (!result) throw new ForbiddenError("failed to add member to room");
        JsonResponse(res, 200, true, "add member to room successful", result);
    }

    async removeMemberFromRoom(req: Request, res: Response): Promise<void> {
        const { roomId } = req.params;
        const userId = req.userId;
        const result = await this.userService.removeMemberFromRoom(userId, roomId as string);
        if (!result) throw new ForbiddenError("failed to remove member from room");
        JsonResponse(res, 200, true, "remove member from room successful", result);
    }
}
