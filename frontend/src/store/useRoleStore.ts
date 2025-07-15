import { create } from 'zustand'

export type Role = 'King' | 'Chef' | 'Cashier' | 'Anon'

interface RoleStore {
  role: Role
  setRole: (role: Role) => void
}

export const useRoleStore = create<RoleStore>((set) => ({
  role: 'Anon',
  setRole: (role) => set({ role })
}))
