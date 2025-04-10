import AppSidebar from '@/components/pages/user/Sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useRequireAuth } from '@/hooks/useRequireAuth'
import { useAuthStore } from '@/store/auth/useAuthStore'

function Profile() {
  const user = useAuthStore((state) => state.user)
  useRequireAuth()

  return (
    <section className="w-full h-full">
      <section className="grid grid-cols-[auto_1fr] grid-rows-[1fr] gap-y-[10px] gap-x-[10px] min-h-screen">
        <section className="">
          <SidebarProvider>
            <AppSidebar user={user} />
            <main>
              <SidebarTrigger />
            </main>
          </SidebarProvider>
        </section>
        <section className="w-full p-6 max-w-screen-2xl mx-auto">Content</section>
      </section>
    </section>
  )
}

export default Profile
