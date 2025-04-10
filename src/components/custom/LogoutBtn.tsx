import { useAuthStore } from '@/store/auth/useAuthStore'
import { logout } from '@/actions/auth/logout'

function LogoutBtn() {
    const user = useAuthStore(state => state.user)
    const setUser = useAuthStore(state => state.setUser)

    const handleEvent = async () => {
        const res = await logout()
        if (res.status === 200) {
            setUser(null)
            return
        }
        return
    }

    if (user) {
        return (
            <button onClick={handleEvent}>Logout</button>
        )
    }
}

export default LogoutBtn