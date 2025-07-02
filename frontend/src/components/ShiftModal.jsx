import { useState, useEffect } from 'react'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const shifts = ['Morning', 'Evening', 'Overnight']

export default function ShiftModal({ staff = [], onClose, onSave, initial }) {
  const [form, setForm] = useState({ staff_id: '', day: days[0], shift: shifts[0] })

  useEffect(() => {
    if (initial) {
      setForm({
        staff_id: initial.staff_id || '',
        day: initial.day || days[0],
        shift: initial.shift || shifts[0]
      })
    }
  }, [initial])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave(form)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-4 rounded space-y-2 w-72">
        <h3 className="text-lg text-[#FFD700]">{initial ? 'Edit Shift' : 'Add Shift'}</h3>
        <form onSubmit={handleSubmit} className="space-y-2">
          <select
            className="border border-[#800000] bg-black text-[#FFD700] p-1 w-full"
            name="staff_id"
            value={form.staff_id}
            onChange={handleChange}
          >
            <option value="">Select Staff</option>
            {staff.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <select
            className="border border-[#800000] bg-black text-[#FFD700] p-1 w-full"
            name="day"
            value={form.day}
            onChange={handleChange}
          >
            {days.map(d => (
              <option key={d} value={d}>{d}</option>
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
          <div className="space-x-2">
            <button type="submit" className="border border-[#800000] px-2 py-1">Save</button>
            <button type="button" className="border border-[#800000] px-2 py-1" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
