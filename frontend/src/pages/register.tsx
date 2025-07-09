import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function Register() {
  const { register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(email, password)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-gold">
      <form onSubmit={handleSubmit} className="bg-[#5c1d1d] p-8 rounded-xl shadow-2xl text-white">
        <h1 className="text-2xl mb-4 text-gold">Register</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          className="block mb-2 p-2 w-64 text-black"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="block mb-4 p-2 w-64 text-black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
          onClick={() => register(email, password)}
        >
          Register
        </button>
      </form>
    </div>
  )
}
