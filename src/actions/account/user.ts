import { ProfileSchema } from "@/schemas/user"
import axios from "axios"
import { z } from "zod"

const API_URL = import.meta.env.VITE_API_URL

export const updateUser = async (id: string, data: z.infer<typeof ProfileSchema>) => {
    try {
        const res = await axios.patch(`${API_URL}/users/${id}`, data, {
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