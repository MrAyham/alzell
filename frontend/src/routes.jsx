import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Confirm from './pages/Confirm'
import Login from './pages/login'
import Logout from './pages/logout'
import App from './App'

export default function AppRoutes() {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path="/confirm" element={<Confirm />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route path="/logout" element={<Logout />} />
      <Route
        path="/dashboard/*"
        element={user ? <App /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/"
        element={<Navigate to={user ? '/dashboard' : '/login'} replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
