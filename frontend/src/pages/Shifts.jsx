import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { addShift } from '../supabase/shifts'
import { usePermissions } from '../RoleContext'

export default function Shifts() {
  const { isKing } = usePermissions()
  const [staff, setStaff] = useState([])
  const [form, setForm] = useState({
    staff_id: '',
    date: '',
    type: 'Morning',
    start: '',
    end: '',
    notes: ''
  })
  const [toast, setToast] = useState('')

  useEffect(() => {
    fetchStaff()
  }, [])

  async function fetchStaff() {
    const { data } = await supabase.from('staff').select('id, name')
    setStaff(data || [])
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.staff_id || !form.date) {
      alert('Staff and date are required')
      return
    }
    try {
      await addShift({
        staff_id: form.staff_id,
        date: form.date,
        type: form.type,
        start: form.start,
        end: form.end,
        notes: form.notes
      })
      setForm({ staff_id: '', date: '', type: 'Morning', start: '', end: '', notes: '' })
      setToast('Shift added successfully')
      setTimeout(() => setToast(''), 3000)
    } catch (err) {
      alert('Failed to add shift')
    }
  }

  if (!isKing()) {
    return <div>You do not have access to this page.</div>
  }

  return (
    <div className='space-y-4 text-[#FFD700]'>
      <h2 className='text-xl font-bold'>Add Shift</h2>
      <form onSubmit={handleSubmit} className='space-y-2'>
        <select
          className='border border-[#800000] bg-black text-[#FFD700] p-1 w-full'
          name='staff_id'
          value={form.staff_id}
          onChange={handleChange}
        >
          <option value=''>Select Staff</option>
          {staff.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <input
          type='date'
          className='border border-[#800000] bg-black text-[#FFD700] p-1 w-full'
          name='date'
          value={form.date}
          onChange={handleChange}
        />
        <select
          className='border border-[#800000] bg-black text-[#FFD700] p-1 w-full'
          name='type'
          value={form.type}
          onChange={handleChange}
        >
          <option value='Morning'>Morning</option>
          <option value='Evening'>Evening</option>
          <option value='Full'>Full</option>
        </select>
        <input
          type='time'
          className='border border-[#800000] bg-black text-[#FFD700] p-1 w-full'
          name='start'
          value={form.start}
          onChange={handleChange}
        />
        <input
          type='time'
          className='border border-[#800000] bg-black text-[#FFD700] p-1 w-full'
          name='end'
          value={form.end}
          onChange={handleChange}
        />
        <textarea
          className='border border-[#800000] bg-black text-[#FFD700] p-1 w-full'
          name='notes'
          placeholder='Notes'
          value={form.notes}
          onChange={handleChange}
        />
        <button type='submit' className='border border-[#800000] px-2 py-1'>Add Shift</button>
      </form>
      {toast && (
        <div className='fixed bottom-4 right-4 bg-green-700 text-white px-3 py-2 rounded'>
          {toast}
        </div>
      )}
    </div>
  )
}
