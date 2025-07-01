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
      <button className="block" onClick={() => onNavigate('inventory')}>
        Inventory
      </button>
codex/build-smart-alerts-system-in-chefmind
      <button className="block" onClick={() => onNavigate('alerts')}>
        Alerts
=======
      <button className="block" onClick={() => onNavigate('tasks')}>
        Tasks
 main
      </button>
      {role === 'King' && (
        <button className="block" onClick={() => onNavigate('king')}>Admin Panel</button>
      )}
    </aside>
  )
}
