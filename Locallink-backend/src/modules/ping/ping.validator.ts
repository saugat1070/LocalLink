import {z} from "zod";

export const pingRequestSchema = z.object({
    message: z.string().optional()
});

export type pingDto = z.infer<typeof pingRequestSchema>;