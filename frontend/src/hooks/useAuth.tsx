import { createContext, useContext, useEffect, useState } from 'react'
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

    alert('✅ Registration successful! Please check your email to verify your account.')
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
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
