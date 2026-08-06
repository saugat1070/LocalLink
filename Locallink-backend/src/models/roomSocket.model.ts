import mongoose from "mongoose";
import { IAuthenticationModel } from "../modules/Authentication/Authentication.model.js";


export interface IRoomSocketModel extends mongoose.Document {
    socketId: string
    roomId: string
    user: Partial<IAuthenticationModel>
}


const roomSocketSchema = new mongoose.Schema<IRoomSocketModel>({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    socketId: {
        type: String,
        required: true,
        index: true
    },
    roomId: {
        type: String,
        required: true,
        index: true
    },
    user: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
});

export const RoomSocketModel = mongoose.model<IRoomSocketModel>("RoomSocket", roomSocketSchema);