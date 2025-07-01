import { useRole } from '../RoleContext'

export default function Sidebar({ onNavigate }) {
  const { role } = useRole()

  return (
    <aside className="space-y-2 mr-4">
      <button className="block" onClick={() => onNavigate('home')}>
        Home
      </button>
      <button className="block" onClick={() => onNavigate('reports')}>
        Reports
      </button>
      <button className="block" onClick={() => onNavigate('alerts')}>
        Alerts
      </button>
      {role === 'King' && (
        <button className="block" onClick={() => onNavigate('king')}>Admin Panel</button>
      )}
    </aside>
  )
}
