import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import { onAuthStateChange } from '../utils/auth'

interface AuthContextProps {
  user: any
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  async function syncAuthUser() {
    const { data: session } = await supabase.auth.getSession()
    const authUser = session?.user
    if (authUser) {
      const role = authUser.email === 'h.b.k.ayhm@gmail.com' ? 'king' : 'worker'
      await supabase
        .from('users')
        .upsert({
          id: authUser.id,
          email: authUser.email,
          role
        }, { onConflict: ['email'] })
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    fetchUser()
    const { data: listener } = onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
codex/sync-auth-user-with-users-table
    await syncAuthUser()
=======
    navigate('/dashboard')
 main
  }

  const register = async (email: string, password: string) => {
    if (!email || !password) {
      alert('❌ Please enter all fields')
      return
    }

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      alert(`❌ Failed to register: ${error.message}`)
      return
    }

    await syncAuthUser()

    alert('✅ Registration successful! Please check your email to verify your account.')
    navigate('/dashboard')
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
  {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
