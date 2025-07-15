import { usePermissions } from '../RoleContext'
import { useRoleStore } from '../store/useRoleStore'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const role = useRoleStore(state => state.role)
  const setRole = useRoleStore(state => state.setRole)
  const { isKing } = usePermissions()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setRole('Anon')
    navigate('/login')
  }

  return (
    <header className="mb-4 flex justify-between items-center card-royal">
      <h1 className="text-xl font-bold text-gold">ChefMind</h1>
      <div className="space-x-2 text-sm">
        <span>Role: {role}</span>
        {isKing() && (
          <button className="btn-royal">Settings</button>
        )}
        <button onClick={handleLogout} className="btn-royal">Logout</button>
      </div>
    </header>
  )
}
