import { useState } from 'react'
import { addStaff } from '../supabase/staff'

export default function AddStaffModal({ isOpen, onClose, onAdded }) {
  const [form, setForm] = useState({
    name: '',
    role: 'Chef',
    shift: '',
    status: 'Active'
  })

  const roles = ['Chef', 'Cashier', 'Manager']
  const statuses = ['Active', 'Inactive', 'Problematic']

  if (!isOpen) return null

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleCancel() {
    setForm({ name: '', role: 'Chef', shift: '', status: 'Active' })
    onClose()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await addStaff(form)
    onAdded()
    setForm({ name: '', role: 'Chef', shift: '', status: 'Active' })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="card-royal space-y-2 w-72">
        <h3 className="text-lg text-gold">Add Staff</h3>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            className="border border-gold bg-dark text-gold p-1 w-full"
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <select
            className="border border-gold bg-dark text-gold p-1 w-full"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            {roles.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <input
            className="border border-gold bg-dark text-gold p-1 w-full"
            placeholder="Shift (e.g. 11am-5pm)"
            name="shift"
            value={form.shift}
            onChange={handleChange}
          />
          <select
            className="border border-gold bg-dark text-gold p-1 w-full"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            {statuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div className="space-x-2">
            <button type="submit" className="btn-royal">Save</button>
            <button type="button" className="btn-royal" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
