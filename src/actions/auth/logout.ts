import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

export const logout = async () => {
    try {
        const res = await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true })
        return res
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data || { error: "An unknown error occurred" }
        }
        return { error: "An unknown error occurred" }
    }
}