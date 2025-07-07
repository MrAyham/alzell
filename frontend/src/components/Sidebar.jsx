import { useRole } from '../RoleContext'

export default function Sidebar({ onNavigate }) {
  const { role } = useRole()

  return (
    <aside className="space-y-2 mr-4">
      <button className="block" onClick={() => onNavigate('home')}>
        Home
      </button>
      <button className="block" onClick={() => onNavigate('dailyReports')}>
        Daily Reports
      </button>
      <button className="block" onClick={() => onNavigate('inventory')}>
        Inventory
      </button>
      <button className="block" onClick={() => onNavigate('staff')}>
        Staff
      </button>
      <button className="block" onClick={() => onNavigate('shifts')}>
        Shifts
      </button>
      <button className="block" onClick={() => onNavigate('schedule')}>
        Schedule
      </button>
      <button className="block" onClick={() => onNavigate('offers')}>
        Offers
      </button>
      <button className="block" onClick={() => onNavigate('alerts')}>
        Alerts
      </button>
      <button className="block" onClick={() => onNavigate('tasks')}>
        Tasks
      </button>
      <button className="block" onClick={() => onNavigate('upsell')}>
        Upsell Center
      </button>
      {role === 'King' && (
        <button className="block" onClick={() => onNavigate('king')}>Admin Panel</button>
      )}
    </aside>
  )
}
