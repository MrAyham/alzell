import { useEffect, useState } from 'react'
import { exportToCsv } from '../utils/export'
import { supabase } from '../lib/supabase'
import {
  getReports,
  addReport as addReportApi,
  updateReport,
  deleteReport,
} from '../supabase/dailyReports'
import { useRole } from '../RoleContext'

export default function DailyReports({ onBack }) {
  const { role } = useRole()
  const [reports, setReports] = useState([])
  const [staff, setStaff] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    staff_id: '',
    date: new Date().toISOString().split('T')[0],
    shift: '',
    notes: '',
    issues: ''
  })
  const [editItem, setEditItem] = useState(null)
  const [editData, setEditData] = useState({
    staff_id: '',
    date: '',
    shift: '',
    notes: '',
    issues: ''
  })

  async function fetchReports() {
    try {
      const data = await getReports()
      setReports(data)
    } catch (err) {
      console.error('Failed to fetch reports', err)
    }
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
    if (!formData.staff_id || !formData.date || !formData.shift || !formData.notes) {
      alert('Please fill in all required fields')
      return
    }
    try {
      await addReportApi({
        staff_id: formData.staff_id,
        date: formData.date,
        shift: formData.shift,
        notes: formData.notes,
        issues: formData.issues,
      })
    } catch (err) {
      alert(err.message || 'Failed to save report')
      return
    }
    alert('Report saved successfully')
    setFormData({
      staff_id: '',
      date: new Date().toISOString().split('T')[0],
      shift: '',
      notes: '',
      issues: '',
    })
    setShowForm(false)
    fetchReports()
  }

  function startEdit(r) {
    setEditItem(r)
    setEditData({
      staff_id: r.staff_id,
      date: r.date,
      shift: r.shift,
      notes: r.notes || '',
      issues: r.issues || '',
    })
  }

  async function saveEdit(e) {
    e.preventDefault()
    try {
      await updateReport(editItem.id, editData)
      setEditItem(null)
      fetchReports()
    } catch (err) {
      alert('Failed to update report')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this report?')) return
    try {
      await deleteReport(id)
      fetchReports()
    } catch (err) {
      alert('Failed to delete report')
    }
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-bold'>Daily Reports</h2>
      <button className='border border-[#800000] px-2 py-1 mb-2' onClick={() => exportToCsv('reports.csv', reports)}>
        Export CSV
      </button>
      <table className='w-full text-left border'>
        <thead>
          <tr className='border-b'>
            <th className='p-2'>Staff</th>
            <th className='p-2'>Date</th>
            <th className='p-2'>Shift</th>
            <th className='p-2'>Notes</th>
            <th className='p-2'>Issues</th>
            <th className='p-2'>Created</th>
            {role !== 'Worker' && <th className='p-2'>Actions</th>}
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
              <td className='p-2'>{new Date(r.created_at).toLocaleString()}</td>
              {role !== 'Worker' && (
                <td className='p-2 space-x-1'>
                  <button className='border px-1' onClick={() => startEdit(r)}>
                    ✏️ Edit Report
                  </button>
                  <button className='border px-1' onClick={() => handleDelete(r.id)}>
                    🗑️ Delete Report
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {role !== 'Worker' && (
        editItem ? (
          <form onSubmit={saveEdit} className='space-y-2'>
          <select
            className='border p-1 w-full text-black'
            value={editData.staff_id}
            onChange={e => setEditData({ ...editData, staff_id: e.target.value })}
            required
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
            value={editData.date}
            onChange={e => setEditData({ ...editData, date: e.target.value })}
            required
          />
          <select
            className='border p-1 w-full text-black'
            value={editData.shift}
            onChange={e => setEditData({ ...editData, shift: e.target.value })}
            required
          >
            <option value=''>Select Shift</option>
            <option value='Morning'>Morning</option>
            <option value='Evening'>Evening</option>
            <option value='Overnight'>Overnight</option>
          </select>
          <textarea
            className='border p-1 w-full text-black'
            placeholder='Notes'
            value={editData.notes}
            onChange={e => setEditData({ ...editData, notes: e.target.value })}
            required
          />
          <textarea
            className='border p-1 w-full text-black'
            placeholder='Issues'
            value={editData.issues}
            onChange={e => setEditData({ ...editData, issues: e.target.value })}
          />
          <div className='space-x-2'>
            <button type='submit' className='border px-2 py-1'>Save</button>
            <button type='button' className='border px-2 py-1' onClick={() => setEditItem(null)}>
              Cancel
            </button>
          </div>
        </form>
        ) : showForm ? (
          <form onSubmit={addReport} className='space-y-2'>
          <select
            className='border p-1 w-full text-black'
            value={formData.staff_id}
            onChange={e => setFormData({ ...formData, staff_id: e.target.value })}
            required
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
            required
          />
          <select
            className='border p-1 w-full text-black'
            value={formData.shift}
            onChange={e => setFormData({ ...formData, shift: e.target.value })}
            required
          >
            <option value=''>Select Shift</option>
            <option value='Morning'>Morning</option>
            <option value='Evening'>Evening</option>
            <option value='Overnight'>Overnight</option>
          </select>
          <textarea
            className='border p-1 w-full text-black'
            placeholder='Notes'
            value={formData.notes}
            onChange={e => setFormData({ ...formData, notes: e.target.value })}
            required
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
          ➕ Add Daily Report
        </button>
      ))}
      <button className='border px-2 py-1' onClick={onBack}>Back</button>
    </div>
  )
}
