import { Server } from "socket.io";
import { redisClient } from "../../config/redis.config.js";
import { UserService } from "../../modules/User/User.service.js";
import { SocketPayLoad } from "../../middleware/socket.middleware.js";

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
        // on join room
        socket.on("join_room", async (data: { roomId: string }) => {
            if (socket.rooms.has(mapRoomId(data.roomId))) {
                return {
                    ack: true,
                    message: "You are already in the room",
                };
            }
            // join socket in room
            socket.join(`room_${data.roomId}`);
            // storing socket id in redis for online status
            await redisClient.sadd(redisSocketKey(data.roomId, socket?.data?._id), socket.id);
            // save socket room
            await userService.joinSocketRoom(socket.data._id, data.roomId);

            // Only the first socket for a user triggers "online"; only the last one leaving triggers "offline". Otherwise closing one of three tabs marks you offline for everyone.
            const isFirstDevice = (await redisClient.scard(redisSocketKey(data.roomId, socket?.data?._id))) === 1;
            if (isFirstDevice) {
                socket.to(`room_${data?.roomId}`).emit("presence:changed", { roomId: data?.roomId, userId: socket.data?._id, status: "online" });
            }
        });

        // on disconnecting
        socket.on("disconnect", async () => {
            // remove socket id from redis
            await redisClient.srem(redisSocketKey(socket?.data?.roomId, socket?.data?._id), socket.id);
        });
    });
};
