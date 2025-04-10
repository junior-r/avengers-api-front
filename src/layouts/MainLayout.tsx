import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { getCurrentUser } from '@/actions/auth/getCurrentUser'
import { Loader } from '@/components/ui/loader'

export const MainLayout = () => {
  const setUser = useAuthStore((state) => state.setUser)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getCurrentUser()
        if (res.status === 200) {
          setUser({ ...res.data })
        } else {
          setUser(null)
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_err) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [setUser])

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <p className="mb-2">Loading...</p>
        <Loader variant="spinner" size="lg" />
      </div>
    )
  } else {
    return (
      <>
        {/* Navbar si querés */}
        <Outlet />
      </>
    )
  }
}
