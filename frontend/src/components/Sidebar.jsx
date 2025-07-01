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
 codex/create-inventory-system-page
      <button className="block" onClick={() => onNavigate('inventory')}>
        Inventory
      </button>
codex/build-smart-alerts-system-in-chefmind
=======
 codex/create-staffpage-with-crud-and-filters
      <button className="block" onClick={() => onNavigate('staff')}>
        Staff
      </button>
=======
 codex/build-smart-alerts-system-in-chefmind
 main
      <button className="block" onClick={() => onNavigate('alerts')}>
        Alerts
=======
 main
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
