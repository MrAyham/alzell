import { useRole, usePermissions } from '../RoleContext'

export default function Sidebar({ onNavigate }) {
  const { role } = useRole()
  const { isKing, canAccessPage } = usePermissions()

  return (
    <aside className="space-y-2 mr-4 p-4 card-royal">
      <button className="block btn-royal w-full" onClick={() => onNavigate('home')}>
        Home
      </button>
      {canAccessPage('dailyReports') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('dailyReports')}>
          Daily Reports
        </button>
      )}
      {canAccessPage('inventory') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('inventory')}>
          Inventory
        </button>
      )}
      {canAccessPage('staff') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('staff')}>
          Staff
        </button>
      )}
      {canAccessPage('shifts') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('shifts')}>
          Shifts
        </button>
      )}
      {canAccessPage('schedule') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('schedule')}>
          Schedule
        </button>
      )}
      {canAccessPage('offers') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('offers')}>
          Offers
        </button>
      )}
      {canAccessPage('orders') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('orders')}>
          Orders
        </button>
      )}
      {canAccessPage('notifications') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('notifications')}>
          Notifications
        </button>
      )}
      {canAccessPage('ai') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('ai')}>
          AI Assistant
        </button>
      )}
      {canAccessPage('alerts') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('alerts')}>
          Alerts
        </button>
      )}
      {canAccessPage('tasks') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('tasks')}>
          Tasks
        </button>
      )}
      {canAccessPage('upsell') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('upsell')}>
          Upsell Center
        </button>
      )}
      {isKing() && (
        <>
          <button className="block btn-royal w-full" onClick={() => onNavigate('king')}>Admin Panel</button>
          <button className="block btn-royal w-full" onClick={() => onNavigate('king-control')}>King Control</button>
          <button className="block btn-royal w-full" onClick={() => onNavigate('config')}>Config</button>
        </>
      )}
    </aside>
  )
}
