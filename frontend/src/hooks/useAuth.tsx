import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { onAuthStateChange } from '../utils/auth'

// Temporarily disable KING role logic
 jime3v-codex/deactivate-king-role-temporarily
const KING_EMAIL = ''
const isKing = true
// const KING_EMAIL = ''
// const isKing = true
 main

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
    try {
      const { data: session } = await supabase.auth.getSession()
      const authUser = session?.user
      if (authUser) {
        const role = 'worker'

        const { data: existing } = await supabase
          .from('users')
          .select('id')
          .eq('id', authUser.id)
          .single()

        if (!existing) {
          await supabase.from('users').insert({
            id: authUser.id,
            email: authUser.email,
            role
          })
        } else {
          await supabase
            .from('users')
            .update({ role })
            .eq('id', authUser.id)
        }
      }
    } catch (err) {
      console.error('Failed to sync user', err)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getUser()
        setUser(data.user)
      } catch (err) {
        console.error('Failed to fetch user', err)
        setUser(null)
      }
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
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      await syncAuthUser()
      navigate('/dashboard')
    } catch (err) {
      console.error('Login failed', err)
      throw err
    }
  }

  const register = async (email: string, password: string) => {
    if (!email || !password) {
      alert('❌ Please enter all fields')
      return
    }

    try {
      const { error } = await supabase.auth.signUp({ email, password })

      if (error) {
        alert(`❌ Failed to register: ${error.message}`)
        return
      }

      await syncAuthUser()

      alert('✅ Registration successful! Please check your email to verify your account.')
      navigate('/dashboard')
    } catch (err) {
      console.error('Registration failed', err)
      alert('❌ Failed to register')
    }
  }

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      navigate('/login')
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
  {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    console.error('useAuth must be used within AuthProvider')
    return {
      user: null,
      login: async () => {},
      register: async () => {},
      logout: async () => {}
    }
  }
  return ctx
}
