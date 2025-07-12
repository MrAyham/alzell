import { useEffect, useState } from 'react'
import { getOrders, addOrder, updateOrder } from '../supabase/orders'
import { useRole } from '../RoleContext'

export default function OrdersPage() {
  const { role } = useRole()
  const [orders, setOrders] = useState([])
  const [form, setForm] = useState({ customer_name: '', notes: '' })

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    try {
      const data = await getOrders()
      setOrders(data)
    } catch (err) {
      console.error('Failed to fetch orders', err)
    }
  }

  async function handleAdd(e) {
    e.preventDefault()
    try {
      await addOrder({ ...form, status: 'Preparing' })
      setForm({ customer_name: '', notes: '' })
      fetchData()
    } catch (err) {
      console.error('Failed to add order', err)
    }
  }

  async function changeStatus(id, status) {
    try {
      await updateOrder(id, { status })
      fetchData()
    } catch (err) {
      console.error('Failed to update order', err)
    }
  }

  function handlePrint(order) {
    window.print()
  }

  return (
    <div className='space-y-4 text-[#FFD700]'>
      <h2 className='text-xl font-bold'>Orders</h2>
      <form onSubmit={handleAdd} className='space-x-2'>
        <input
          className='border border-[#800000] bg-black text-[#FFD700] p-1'
          placeholder='Customer name'
          value={form.customer_name}
          onChange={e => setForm({ ...form, customer_name: e.target.value })}
        />
        <input
          className='border border-[#800000] bg-black text-[#FFD700] p-1'
          placeholder='Notes'
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
        />
        <button className='border border-[#800000] px-2 py-1'>Create</button>
      </form>
      <table className='w-full text-left border border-[#800000]'>
        <thead>
          <tr className='border-b border-[#800000]'>
            <th className='p-2'>Number</th>
            <th className='p-2'>Customer</th>
            <th className='p-2'>Status</th>
            <th className='p-2'>Created</th>
            <th className='p-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} className='border-b border-[#800000]'>
              <td className='p-2'>{o.order_number}</td>
              <td className='p-2'>{o.customer_name || '-'}</td>
              <td className='p-2'>{o.status}</td>
              <td className='p-2'>{new Date(o.created_at).toLocaleString()}</td>
              <td className='p-2 space-x-1'>
                {o.status !== 'Ready' && (
                  <button className='border border-[#800000] px-1' onClick={() => changeStatus(o.id, 'Ready')}>
                    Mark Ready
                  </button>
                )}
                {o.status !== 'Delivered' && (
                  <button className='border border-[#800000] px-1' onClick={() => changeStatus(o.id, 'Delivered')}>
                    Deliver
                  </button>
                )}
                <button className='border border-[#800000] px-1' onClick={() => handlePrint(o)}>Print</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
