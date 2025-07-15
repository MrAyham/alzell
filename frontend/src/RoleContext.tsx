import { ReactNode } from 'react'
import { useRoleStore, Role } from './store/useRoleStore'

export function RoleProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function useRole() {
  const role = useRoleStore(state => state.role)
  const setRole = useRoleStore(state => state.setRole)
  return { role, setRole }
}

const rolePermissions: Record<Role | string, string[]> = {
  King: ['*'],
  Admin: ['inventory', 'staff', 'dailyReports', 'orders'],
  Chef: ['inventory', 'dailyReports'],
  Waiter: ['orders'],
}

export function usePermissions() {
  const role = useRoleStore(state => state.role)
  const perms = rolePermissions[role] || []
  const isKing = () => role === 'King'
  const getUserPermissions = () => (isKing() ? ['*'] : perms)
  const canAccessPage = (page: string) => isKing() || perms.includes(page)
  return { isKing, canAccessPage, getUserPermissions }
}
