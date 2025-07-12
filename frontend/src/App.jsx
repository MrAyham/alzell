import { useAuth } from './hooks/useAuth'
import Login from './pages/login'
import Register from './pages/register'

function App() {
  const { user } = useAuth()

  if (!user) {
    if (location.hash === '#register') {
      return <Register />
    }
    return <Login />
  }

  if (!user.confirmed_at) {
    return <p className='text-white'>Please verify your email to access the app.</p>
  }

  return (
    <div className='p-6 text-white'>
      <h1 className='text-2xl mb-4'>Welcome, {user.email}</h1>
    </div>
  )
}

export default App
