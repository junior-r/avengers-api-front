import { z } from "zod"

export const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
})

export const RegisterSchema = LoginSchema.extend({
    name: z.string().min(2, { message: "Name is required" }).max(20),
    lastName: z.string().min(2, { message: "Last name is required" }).max(20),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters long" })
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})