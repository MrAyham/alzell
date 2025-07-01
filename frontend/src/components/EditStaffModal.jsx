import { useState, useEffect } from 'react'
import { updateStaff } from '../supabase/staff'

export default function EditStaffModal({ isOpen, staff, onClose, onUpdated }) {
  const [form, setForm] = useState({ name: '', role: 'Chef', shift: 'Morning', status: 'Active' })

  const roles = ['Chef', 'Cashier', 'Server']
  const shifts = ['Morning', 'Evening']
  const statuses = ['Active', 'On Leave', 'Terminated']

  useEffect(() => {
    if (staff) {
      setForm({
        name: staff.name || '',
        role: staff.role || '',
        shift: staff.shift || '',
        status: staff.status || '',
      })
    }
  }, [staff])

  if (!isOpen || !staff) return null

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleCancel() {
    onClose()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await updateStaff(staff.id, form)
    onUpdated()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-4 rounded space-y-2 w-72">
        <h3 className="text-lg text-[#FFD700]">Edit Staff</h3>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            className="border border-[#800000] bg-black text-[#FFD700] p-1 w-full"
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <select
            className="border border-[#800000] bg-black text-[#FFD700] p-1 w-full"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            {roles.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <select
            className="border border-[#800000] bg-black text-[#FFD700] p-1 w-full"
            name="shift"
            value={form.shift}
            onChange={handleChange}
          >
            {shifts.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            className="border border-[#800000] bg-black text-[#FFD700] p-1 w-full"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            {statuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div className="space-x-2">
            <button type="submit" className="border border-[#800000] px-2 py-1">Save</button>
            <button type="button" className="border border-[#800000] px-2 py-1" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
