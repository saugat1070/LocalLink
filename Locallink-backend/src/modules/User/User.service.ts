import mongoose from "mongoose";
import { AuthenticationModel } from "../Authentication/Authentication.model.js"
import { IRoomSocketModel, RoomSocketModel } from "../../models/roomSocket.model.js";
export interface IUserService {
    addMemberToRoom(userId: string | mongoose.Types.ObjectId, roomId: string): Promise<IRoomSocketModel | null>
    removeMemberFromRoom(userId: string | mongoose.Types.ObjectId, roomId: string): Promise<IRoomSocketModel | null>
    getUserRooms(userId: string | mongoose.Types.ObjectId): Promise<IRoomSocketModel[] | null>
}

export class UserService implements IUserService {
    constructor() {
    }
    // @usecase: add member to room chat
    async addMemberToRoom(userId: string | mongoose.Types.ObjectId, roomId: string): Promise<IRoomSocketModel | null> {
        const joinRoom = await RoomSocketModel.findOneAndUpdate(
            {userId: userId},
            {
                $addToSet: {
                    roomId: roomId
                }
            },
            {
                returnDocument: "after"
            }
        );
        return joinRoom;
    }

    async removeMemberFromRoom(userId: string | mongoose.Types.ObjectId, roomId: string): Promise<IRoomSocketModel | null> {
        const leaveRoom = await RoomSocketModel.findOneAndUpdate(
            {userId: userId},
            {
                $pull: {
                    roomId: roomId
                }
            },
            {
                returnDocument: "after"
            }
        );
        return leaveRoom;
    }

    async getUserRooms(userId: string | mongoose.Types.ObjectId): Promise<IRoomSocketModel[] | null> {
        const rooms = await RoomSocketModel.find({userId: userId});
        return rooms;
    }
}