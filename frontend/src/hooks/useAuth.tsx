import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { onAuthStateChange } from '../utils/auth'
import { useRoleStore } from '../store/useRoleStore'

interface AuthContextProps {
  user: any
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const setRole = useRoleStore(state => state.setRole)

  const fetchRole = async (email: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('roles(name)')
      .eq('email', email)
      .single()
    if (error) {
      console.error(error)
      setRole('Anon')
      return
    }
    setRole((data as any)?.roles?.name ?? 'Anon')
  }

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      if (data.user && data.user.email) await fetchRole(data.user.email)
      else setRole('Anon')
    }
    fetchUser()
    const { data: listener } = onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user?.email) fetchRole(session.user.email)
      else setRole('Anon')
    })
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    if (data.user?.email) await fetchRole(data.user.email)
  }


  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setRole('Anon')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
  {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
