import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useRoleStore, Role } from '../store/useRoleStore'

interface Props {
  roles: Role[]
  children: ReactNode
}

export default function RequireRole({ roles, children }: Props) {
  const role = useRoleStore(s => s.role)
  if (!roles.includes(role)) {
    return <Navigate to="/unauthorized" replace />
  }
  return <>{children}</>
}
