import { z } from "zod";

export const ProfileSchema = z.object({
    name: z.string().min(2, { message: "Name is required" }).max(20),
    lastName: z.string().min(2, { message: "Last name is required" }).max(20),
})