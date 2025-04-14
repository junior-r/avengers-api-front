import { CreateTokenSchema } from "@/schemas/token"
import axios from "axios"
import { z } from "zod"

const API_URL = import.meta.env.VITE_API_URL

export const createToken = async (userId: string, data: z.infer<typeof CreateTokenSchema>) => {
    try {
        const res = await axios.post(`${API_URL}/token/${userId}`, data, {
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