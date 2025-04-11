import { useRequireAuth } from '@/hooks/useRequireAuth'

function TokenPage() {
  useRequireAuth()
  return (
    <section className="w-full h-full py-6">
      <section className="w-full max-w-screen-2xl mx-auto">Token</section>
    </section>
  )
}

export default TokenPage
