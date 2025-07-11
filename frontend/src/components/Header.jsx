import { useRole } from '../RoleContext'
import { useAuth } from '../hooks/useAuth'
import { KING_ID } from '../constants'

export default function Header() {
  const { role } = useRole()
  const { user } = useAuth()

  return (
    <header className="mb-4 flex justify-between items-center card-royal">
      <h1 className="text-xl font-bold text-gold">ChefMind</h1>
      <div className="space-x-2 text-sm">
        <span>Role: {role}</span>
        {user?.id === KING_ID && (
          <button className="btn-royal">Settings</button>
        )}
      </div>
    </header>
  )
}
