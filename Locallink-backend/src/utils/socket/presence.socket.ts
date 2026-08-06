import { redisClient } from "../../config/redis.config.js";

const ONLINE_USERS_KEY = "online:users";
const onlineUsersKeys = (userId: string) => `online:user:${userId}`;

// return true if user is online
export const markSocketOnline = async (userId: string, socketId: string): Promise<boolean> =>{
    const result = await redisClient.sadd(onlineUsersKeys(userId), socketId);
    const deviceCount = await redisClient.scard(onlineUsersKeys(userId));
    // user's FIRST connected socket (i.e. they just came online)
    if (deviceCount === 1) {
        await redisClient.sadd(ONLINE_USERS_KEY, userId);
        return true;
    }
    return false;
}

export const markSocketOffline = async (userId: string, socketId: string): Promise<boolean> => {
    const result = await redisClient.srem(onlineUsersKeys(userId), socketId);
    const deviceCount = await redisClient.scard(onlineUsersKeys(userId));
    // user's LAST disconnected socket (i.e. they just went offline)
    if (deviceCount === 0) {
        await redisClient.srem(ONLINE_USERS_KEY, userId);
        return true;
    }
    return false;
}

export const isUserOnline = async (userId: string): Promise<boolean> => {
    return (await redisClient.sismember(ONLINE_USERS_KEY, userId)) === 1;
}

export const listOnlineUsers = async (): Promise<string[]> => {
    return await redisClient.smembers(ONLINE_USERS_KEY);
}
