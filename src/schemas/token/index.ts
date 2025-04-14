import { z } from "zod";

export const CreateTokenSchema = z.object({
    description: z.string().max(50).optional(),
    activeDays: z.number().max(365).optional()
})
