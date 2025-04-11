import { useRequireAuth } from '@/hooks/useRequireAuth'
import { useAuthStore } from '@/store/auth/useAuthStore'

function Profile() {
  const user = useAuthStore((state) => state.user)
  useRequireAuth()

  return (
    <section className="w-full h-full py-6">
      <section className="w-full max-w-screen-2xl mx-auto">Profile</section>
    </section>
  )
}

export default Profile
