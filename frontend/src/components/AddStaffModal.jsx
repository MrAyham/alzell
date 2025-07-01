import { useState } from 'react'
import { addStaff } from '../supabase/staff'

export default function AddStaffModal({ isOpen, onClose, onAdded }) {
  const [form, setForm] = useState({ name: '', role: '', shift: '', status: '' })

  if (!isOpen) return null

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await addStaff(form)
    onAdded()
    setForm({ name: '', role: '', shift: '', status: '' })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-4 rounded space-y-2 w-72">
        <h3 className="text-lg text-[#FFD700]">Add Staff</h3>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            className="border border-[#800000] bg-black text-[#FFD700] p-1 w-full"
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            className="border border-[#800000] bg-black text-[#FFD700] p-1 w-full"
            placeholder="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
          />
          <input
            className="border border-[#800000] bg-black text-[#FFD700] p-1 w-full"
            placeholder="Shift"
            name="shift"
            value={form.shift}
            onChange={handleChange}
          />
          <input
            className="border border-[#800000] bg-black text-[#FFD700] p-1 w-full"
            placeholder="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
          />
          <div className="space-x-2">
            <button type="submit" className="border border-[#800000] px-2 py-1">Save</button>
            <button type="button" className="border border-[#800000] px-2 py-1" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
