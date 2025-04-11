import { useRequireAuth } from '@/hooks/useRequireAuth'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { Outlet } from 'react-router-dom'

function Layout() {
  const user = useAuthStore((state) => state.user)
  useRequireAuth(false)

  if (!user) {
    return (
      <div className="w-full relative">
        <div
          className="
      absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black 
      bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]
      dark:bg-[linear-gradient(to_right,#1a202c_1px,transparent_1px),linear-gradient(to_bottom,#1a202c_1px,transparent_1px)] dark:bg-[size:6rem_4rem]
      "
        ></div>
        <div className="h-screen flex items-center justify-center gap-4">
          <Outlet />
        </div>
      </div>
    )
  }
}

export default Layout
