import { useAuth } from '../hooks/useAuth'

export default function Navbar() {
  const { user, logout } = useAuth()

  const identity = user ? `👷 ${user.email}` : ''

  return (
    <header className="mb-4 flex justify-between items-center card-royal">
      <h1 className="text-xl font-bold text-gold">ChefMind</h1>
      <div className="space-x-2 text-sm flex items-center">
        {identity && <span>{identity}</span>}
        {user && (
          <button onClick={logout} className="btn-royal">Logout</button>
        )}
        {user && (
          <button className="btn-royal">Settings</button>
        )}
      </div>
    </header>
  )
}
