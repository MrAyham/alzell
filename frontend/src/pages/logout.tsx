import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Logout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Trigger sign out then redirect once complete.
    logout().finally(() => {
      navigate(user ? '/dashboard' : '/login', { replace: true })
    })
  }, [logout, navigate, user])

  return <p className="text-white">Logging out...</p>
}
