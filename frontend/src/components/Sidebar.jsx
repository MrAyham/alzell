import { useRole } from '../RoleContext'
import { useAuth } from '../hooks/useAuth'

export default function Sidebar({ onNavigate }) {
  const { role } = useRole()
  const { user } = useAuth()
  const rolePages = {
    admin: ['home','dailyReports','inventory','staff','shifts','schedule','offers','orders','notifications','ai','alerts','tasks','upsell','king','king-control','config'],
    cashier: ['home','orders'],
    chef: ['home','inventory','orders'],
    delivery: ['home','orders'],
  }

  return (
    <aside className="space-y-2 mr-4 p-4 card-royal">
      {rolePages[role]?.includes('home') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('home')}>Home</button>
      )}
      {rolePages[role]?.includes('dailyReports') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('dailyReports')}>
          Daily Reports
        </button>
      )}
      {rolePages[role]?.includes('inventory') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('inventory')}>
          Inventory
        </button>
      )}
      {rolePages[role]?.includes('staff') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('staff')}>
          Staff
        </button>
      )}
      {rolePages[role]?.includes('shifts') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('shifts')}>
          Shifts
        </button>
      )}
      {rolePages[role]?.includes('schedule') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('schedule')}>
          Schedule
        </button>
      )}
      {rolePages[role]?.includes('offers') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('offers')}>
          Offers
        </button>
      )}
      {rolePages[role]?.includes('orders') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('orders')}>
          Orders
        </button>
      )}
      {rolePages[role]?.includes('notifications') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('notifications')}>
          Notifications
        </button>
      )}
      {rolePages[role]?.includes('ai') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('ai')}>
          AI Assistant
        </button>
      )}
      {rolePages[role]?.includes('alerts') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('alerts')}>
          Alerts
        </button>
      )}
      {rolePages[role]?.includes('tasks') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('tasks')}>
          Tasks
        </button>
      )}
      {rolePages[role]?.includes('upsell') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('upsell')}>
          Upsell Center
        </button>
      )}
      {rolePages[role]?.includes('king') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('king')}>Admin Panel</button>
      )}
      {rolePages[role]?.includes('king-control') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('king-control')}>King Control</button>
      )}
      {rolePages[role]?.includes('config') && (
        <button className="block btn-royal w-full" onClick={() => onNavigate('config')}>Config</button>
      )}
    </aside>
  )
}
