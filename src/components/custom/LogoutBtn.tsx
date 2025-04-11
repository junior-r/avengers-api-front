import { useAuthStore } from '@/store/auth/useAuthStore'
import { logout } from '@/actions/auth/logout'
import { LogOutIcon } from 'lucide-react'
import { Button } from '../ui/button'

type Props = {
  showIcon?: boolean
}

function LogoutBtn({ showIcon = false }: Props) {
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)

  const handleEvent = async () => {
    const res = await logout()
    if (res.status === 200) {
      setUser(null)
      return
    }
    return
  }

  if (user) {
    if (showIcon) {
      return (
        <Button variant="outline" size="icon" onClick={handleEvent} title="Logout">
          <LogOutIcon />
        </Button>
      )
    } else {
      return (
        <button onClick={handleEvent} title="Logout">
          Logout
        </button>
      )
    }
  }
}

export default LogoutBtn
