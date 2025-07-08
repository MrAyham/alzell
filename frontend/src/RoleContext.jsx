import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './hooks/useAuth'

export const RoleContext = createContext({ role: null, name: null })

export function RoleProvider({ children }) {
  const { user } = useAuth()
  const [role, setRole] = useState(null)
  const [name, setName] = useState(null)

  useEffect(() => {
    if (user) {
      setRole((user as any).user_metadata?.role || 'Staff')
      setName(user.email)
    } else {
      setRole(null)
      setName(null)
    }
  }, [user])

  return (
    <RoleContext.Provider value={{ role, name }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  return useContext(RoleContext)
}
