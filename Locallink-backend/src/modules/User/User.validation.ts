import { z } from "zod";

export const RoomParamsValidation = z.object({
    roomId: z
        .string({
            error: "Room id must be a string",
        })
        .min(1, { message: "You forgot to include the roomId" })
        .max(100, { message: "Room id must be less than 100 characters" }),
});
