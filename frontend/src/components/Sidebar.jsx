import { useRole } from '../RoleContext'
import { useAuth } from '../hooks/useAuth'
import { KING_ID } from '../constants'

export default function Sidebar({ onNavigate }) {
  const { role } = useRole()
  const { user } = useAuth()

  return (
    <aside className="space-y-2 mr-4 p-4 card-royal">
      <button className="block btn-royal w-full" onClick={() => onNavigate('home')}>
        Home
      </button>
      <button className="block btn-royal w-full" onClick={() => onNavigate('dailyReports')}>
        Daily Reports
      </button>
      <button className="block btn-royal w-full" onClick={() => onNavigate('inventory')}>
        Inventory
      </button>
      <button className="block btn-royal w-full" onClick={() => onNavigate('staff')}>
        Staff
      </button>
      <button className="block btn-royal w-full" onClick={() => onNavigate('shifts')}>
        Shifts
      </button>
      <button className="block btn-royal w-full" onClick={() => onNavigate('schedule')}>
        Schedule
      </button>
      <button className="block btn-royal w-full" onClick={() => onNavigate('offers')}>
        Offers
      </button>
      <button className="block btn-royal w-full" onClick={() => onNavigate('orders')}>
        Orders
      </button>
      <button className="block btn-royal w-full" onClick={() => onNavigate('notifications')}>
        Notifications
      </button>
      <button className="block btn-royal w-full" onClick={() => onNavigate('ai')}>
        AI Assistant
      </button>
      <button className="block btn-royal w-full" onClick={() => onNavigate('alerts')}>
        Alerts
      </button>
      <button className="block btn-royal w-full" onClick={() => onNavigate('tasks')}>
        Tasks
      </button>
      <button className="block btn-royal w-full" onClick={() => onNavigate('upsell')}>
        Upsell Center
      </button>
      {user?.id === KING_ID && (
        <>
          <button className="block btn-royal w-full" onClick={() => onNavigate('king')}>Admin Panel</button>
          <button className="block btn-royal w-full" onClick={() => onNavigate('king-control')}>King Control</button>
          <button className="block btn-royal w-full" onClick={() => onNavigate('config')}>Config</button>
        </>
      )}
    </aside>
  )
}
