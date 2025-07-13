import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { useRole } from '../RoleContext'

export default function Alerts() {
  const { role } = useRole()
  const [alerts, setAlerts] = useState([])

  async function fetchAlerts() {
    // fetch dismissed alerts
    const { data: dismissedData } = await supabase
      .from('dismissed_alerts')
      .select('message')
    const dismissed = dismissedData ? dismissedData.map(d => d.message) : []

    // inventory alerts
    const { data: inv } = await supabase
      .from('inventory')
      .select('id, name, updated_at')
      .eq('low_stock_alert', true)
    const invAlerts = (inv || []).map(i => ({
      id: `inv-${i.id}`,
      message: `${i.name} is running low!`,
      type: 'Stock',
      created_at: i.updated_at || new Date().toISOString(),
    }))

    // staff alerts
    const { data: staff } = await supabase
      .from('staff')
      .select('id, name, role, status, updated_at')
      .neq('status', 'Active')
    const staffAlerts = (staff || []).map(s => ({
      id: `staff-${s.id}`,
      message: `${s.name} (${s.role}) is marked as inactive.`,
      type: 'Staff',
      created_at: s.updated_at || new Date().toISOString(),
    }))

    // task alerts
    const nowIso = new Date().toISOString()
    const { data: tasks } = await supabase
      .from('daily_tasks')
      .select('id, task, due, updated_at')
      .eq('status', 'pending')
      .lt('due', nowIso)
    const taskAlerts = (tasks || []).map(t => ({
      id: `task-${t.id}`,
      message: `${t.task} – still pending since ${t.due}.`,
      type: 'Task',
      created_at: t.updated_at || t.due,
    }))

    const all = [...invAlerts, ...staffAlerts, ...taskAlerts]
      .filter(a => !dismissed.includes(a.message))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    setAlerts(all)
  }

  async function dismissAlert(alert) {
    await supabase.from('dismissed_alerts').insert({ message: alert.message })
    fetchAlerts()
  }

  useEffect(() => {
    fetchAlerts()
  }, [])

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-bold'>Alerts</h2>
      <div className='space-y-2'>
        {alerts.map(a => (
          <div key={a.id} className='border p-3 flex justify-between'>
            <div>
              <div className='font-semibold'>{a.message}</div>
              <div className='text-sm text-gray-400'>
                {a.type} – {new Date(a.created_at).toLocaleString()}
              </div>
            </div>
            {role === 'King' && (
              <button
                className='border px-2 py-1'
                onClick={() => dismissAlert(a)}
              >
                Dismiss
              </button>
            )}
          </div>
        ))}
        {alerts.length === 0 && <div>No alerts at this time.</div>}
      </div>
    </div>
  )
}
