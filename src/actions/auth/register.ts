import { RegisterSchema } from "@/schemas/auth";
import { z } from "zod";
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

export const register = async (data: z.infer<typeof RegisterSchema>) => {
    try {
        const res = await axios.post(`${API_URL}/auth/register`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data || { error: "An unknown error occurred" }
        }
        return { error: "An unknown error occurred" }
    }
}