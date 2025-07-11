import { useRole } from '../RoleContext'
import { useAuth } from '../hooks/useAuth'
import { KING_ID } from '../constants'

export default function Navbar() {
  const { role } = useRole()
  const { user, logout } = useAuth()

  const identity = role === 'king'
    ? '👑 الملك'
    : user
      ? `👷 ${user.email}`
      : ''

  return (
    <header className="mb-4 flex justify-between items-center card-royal">
      <h1 className="text-xl font-bold text-gold">ChefMind</h1>
      <div className="space-x-2 text-sm flex items-center">
        {identity && <span>{identity}</span>}
        {user && (
          <button onClick={logout} className="btn-royal">Logout</button>
        )}
        {user?.id === KING_ID && (
          <button className="btn-royal">Settings</button>
        )}
      </div>
    </header>
  )
}
