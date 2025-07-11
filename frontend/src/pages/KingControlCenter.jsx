import { useEffect, useState } from 'react'
import { useRole } from '../RoleContext'
import { useAuth } from '../hooks/useAuth'
import { KING_ID } from '../constants'
import { getStaff } from '../supabase/staff'
import { getInventory } from '../supabase/inventory'
import { getOrders } from '../supabase/orders'

export default function KingControlCenter() {
  const { role } = useRole()
  const { user } = useAuth()
  const [summary, setSummary] = useState({ staff: 0, inventory: 0, orders: 0 })
  const [enabled, setEnabled] = useState({ staff: true, inventory: true, orders: true })

  useEffect(() => { if (user?.id === KING_ID) load() }, [user])

  async function load() {
    const staff = await getStaff()
    const inv = await getInventory()
    const ord = await getOrders()
    setSummary({ staff: staff.length, inventory: inv.length, orders: ord.length })
  }

  if (user?.id !== KING_ID) return <div>You do not have access to this page.</div>

  return (
    <div className='space-y-4 text-[#FFD700]'>
      <h2 className='text-xl font-bold'>King Control Center</h2>
      <div className='space-y-2'>
        <div className='flex items-center space-x-2'>
          <label className='flex-1'>Staff ({summary.staff})</label>
          <button className='border border-[#800000] px-2' onClick={() => setEnabled(e => ({...e, staff: !e.staff}))}>
            {enabled.staff ? 'Disable' : 'Enable'}
          </button>
        </div>
        <div className='flex items-center space-x-2'>
          <label className='flex-1'>Inventory ({summary.inventory})</label>
          <button className='border border-[#800000] px-2' onClick={() => setEnabled(e => ({...e, inventory: !e.inventory}))}>
            {enabled.inventory ? 'Disable' : 'Enable'}
          </button>
        </div>
        <div className='flex items-center space-x-2'>
          <label className='flex-1'>Orders ({summary.orders})</label>
          <button className='border border-[#800000] px-2' onClick={() => setEnabled(e => ({...e, orders: !e.orders}))}>
            {enabled.orders ? 'Disable' : 'Enable'}
          </button>
        </div>
      </div>
    </div>
  )
}
