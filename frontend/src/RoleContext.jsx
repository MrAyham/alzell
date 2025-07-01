import { createContext, useContext, useState } from 'react'

export const RoleContext = createContext({ role: null })

export function RoleProvider({ children }) {
  // TODO: later role should come from Supabase session
  const currentUser = {
    name: 'Ayham',
    role: 'King',
  }
  const [role] = useState(currentUser.role)

  return (
    <RoleContext.Provider value={{ role }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  return useContext(RoleContext)
}
