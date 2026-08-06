import { Server } from "socket.io";
import { redisClient } from "../../config/redis.config.js";
import { UserService } from "../../modules/User/User.service.js";
import { SocketPayLoad } from "../../middleware/socket.middleware.js";
import { listOnlineUsers, markSocketOffline } from "./presence.socket.js";

const userService = new UserService();
const mapSocketId = (userId: string) => {
    return `socket_${userId}`;
};

const mapRoomId = (roomId: string) => {
    return `room_${roomId}`;
};

const redisSocketKey = (roomId: string, socketId: string) => {
    return `${mapRoomId(roomId)}_${mapSocketId(socketId)}`;
};

export const socketMethod = (io: Server) => {
    io.on("connection", (socket) => {
        socket.on("join_room", async () => {
            const myRooms = await userService.getUserRooms(socket.data._id); // fetching user's rooms
            myRooms?.forEach((room) => socket.join(mapRoomId(room.roomId)));
        });

        socket.on("get_online_users", async (data: { userIds: string[] }, callback) => {
            const onlineUsers = await listOnlineUsers();
            // storing online users in set to check if user is online or not
            const onlineSet = new Set(onlineUsers);
            callback(data.userIds.map((id) => ({ userId: id, isOnline: onlineSet.has(id) })));
        });

        socket.on("disconnect", async () => {
            const wentOffline = await markSocketOffline(socket.data._id, socket.id);
            if (wentOffline) {
                io.emit("presence:changed", { userId: socket.data._id, isOnline: false });
            }
        });
    });
};
