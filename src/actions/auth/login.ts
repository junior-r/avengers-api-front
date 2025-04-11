import { LoginSchema } from "@/schemas/auth";
import { z } from "zod";
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const login = async (data: z.infer<typeof LoginSchema>) => {
    try {
        const res = await axios.post(`${API_URL}/auth/login`, data, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data || { error: "An unknown error occurred" }
        }
        return { error: "An unknown error occurred" }
    }
}