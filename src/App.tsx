import Navbar from "./components/custom/Navbar"
import { useAuthStore } from "./store/auth/useAuthStore"

function App() {
  const user = useAuthStore(state => state.user)

  return (
    <main className="">
      <Navbar />
      <section className="container mx-auto">
        <p>Hola {user?.name}</p>
      </section>
    </main>
  )
}

export default App
