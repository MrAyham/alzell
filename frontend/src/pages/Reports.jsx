import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { useRole } from '../RoleContext'

export default function Reports({ onBack }) {
  const { role } = useRole()
  const [reports, setReports] = useState([])
  const [staff, setStaff] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    staff_id: '',
    date: '',
    shift: '',
    notes: '',
    issues: ''
  })

  async function fetchReports() {
    const { data } = await supabase
      .from('daily_reports')
      .select('id, date, shift, notes, issues, staff_id, staff(name)')
      .order('date', { ascending: false })
    setReports(data || [])
  }

  async function fetchStaff() {
    const { data } = await supabase.from('staff').select('id, name')
    setStaff(data || [])
  }

  useEffect(() => {
    fetchReports()
    fetchStaff()
  }, [])

  async function addReport(e) {
    e.preventDefault()
    await supabase.from('daily_reports').insert({
      staff_id: formData.staff_id,
      date: formData.date,
      shift: formData.shift,
      notes: formData.notes,
      issues: formData.issues
    })
    setFormData({ staff_id: '', date: '', shift: '', notes: '', issues: '' })
    setShowForm(false)
    fetchReports()
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-bold'>Daily Reports</h2>
      <table className='w-full text-left border'>
        <thead>
          <tr className='border-b'>
            <th className='p-2'>Staff</th>
            <th className='p-2'>Date</th>
            <th className='p-2'>Shift</th>
            <th className='p-2'>Notes</th>
            <th className='p-2'>Issues</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(r => (
            <tr key={r.id} className='border-b'>
              <td className='p-2'>{r.staff?.name}</td>
              <td className='p-2'>{r.date}</td>
              <td className='p-2'>{r.shift}</td>
              <td className='p-2'>{r.notes}</td>
              <td className='p-2'>{r.issues}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {role !== 'Worker' && (
        showForm ? (
          <form onSubmit={addReport} className='space-y-2'>
          <select
            className='border p-1 w-full text-black'
            value={formData.staff_id}
            onChange={e => setFormData({ ...formData, staff_id: e.target.value })}
          >
            <option value=''>Select Staff</option>
            {staff.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <input
            type='date'
            className='border p-1 w-full text-black'
            value={formData.date}
            onChange={e => setFormData({ ...formData, date: e.target.value })}
          />
          <input
            className='border p-1 w-full text-black'
            placeholder='Shift'
            value={formData.shift}
            onChange={e => setFormData({ ...formData, shift: e.target.value })}
          />
          <textarea
            className='border p-1 w-full text-black'
            placeholder='Notes'
            value={formData.notes}
            onChange={e => setFormData({ ...formData, notes: e.target.value })}
          />
          <textarea
            className='border p-1 w-full text-black'
            placeholder='Issues'
            value={formData.issues}
            onChange={e => setFormData({ ...formData, issues: e.target.value })}
          />
          <div className='space-x-2'>
            <button type='submit' className='border px-2 py-1'>Save</button>
            <button type='button' className='border px-2 py-1' onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button className='border px-2 py-1' onClick={() => setShowForm(true)}>
          Add Report
        </button>
      ))}
      <button className='border px-2 py-1' onClick={onBack}>Back</button>
    </div>
  )
}
