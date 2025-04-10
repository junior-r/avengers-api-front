import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

export const getCurrentUser = async () => {
    try {

        const res = await axios.get(`${API_URL}/users/me`, {
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