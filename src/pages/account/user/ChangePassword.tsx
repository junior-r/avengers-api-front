import { useRequireAuth } from '@/hooks/useRequireAuth'

function ChangePassword() {
  useRequireAuth()
  return (
    <section className="w-full h-full py-6">
      <section className="w-full max-w-screen-2xl mx-auto">Change Password</section>
    </section>
  )
}

export default ChangePassword
