import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { useRole } from '../RoleContext'
import { useAuth } from '../hooks/useAuth'
import { KING_ID } from '../constants'

export default function DailyTasks() {
  const { role, name } = useRole()
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [staff, setStaff] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ task: '', shift: '', staff_id: '' })
  const [filters, setFilters] = useState({ shift: '', status: '', staff_id: '' })

  useEffect(() => {
    fetchStaff()
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [filters])

  async function fetchTasks() {
    let query = supabase
      .from('daily_tasks')
      .select('id, task, shift, status, created_at, staff(name)')
      .order('created_at', { ascending: false })
    if (filters.shift) query = query.eq('shift', filters.shift)
    if (filters.status) query = query.eq('status', filters.status)
    if (filters.staff_id) query = query.eq('staff_id', filters.staff_id)
    const { data } = await query
    setTasks(data || [])
  }

  async function fetchStaff() {
    const { data } = await supabase.from('staff').select('id, name')
    setStaff(data || [])
  }

  async function addTask(e) {
    e.preventDefault()
    await supabase.from('daily_tasks').insert({
      task: formData.task,
      shift: formData.shift,
      staff_id: formData.staff_id,
      status: 'pending',
    })
    setFormData({ task: '', shift: '', staff_id: '' })
    setShowForm(false)
    fetchTasks()
  }

  async function updateStatus(id, status) {
    await supabase.from('daily_tasks').update({ status }).eq('id', id)
    fetchTasks()
  }

  async function deleteTask(id) {
    await supabase.from('daily_tasks').delete().eq('id', id)
    fetchTasks()
  }

  const canEdit = user?.id === KING_ID

  return (
    <div className="space-y-4 text-[#FFD700]">
      <h2 className="text-xl font-bold">Daily Tasks</h2>
      <div className="space-x-2">
        <select
          className="border border-[#800000] bg-black text-[#FFD700] p-1"
          value={filters.shift}
          onChange={e => setFilters({ ...filters, shift: e.target.value })}
        >
          <option value="">All Shifts</option>
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
          <option value="Double">Double</option>
        </select>
        <select
          className="border border-[#800000] bg-black text-[#FFD700] p-1"
          value={filters.status}
          onChange={e => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
          <option value="skipped">Skipped</option>
        </select>
        <select
          className="border border-[#800000] bg-black text-[#FFD700] p-1"
          value={filters.staff_id}
          onChange={e => setFilters({ ...filters, staff_id: e.target.value })}
        >
          <option value="">All Staff</option>
          {staff.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>
      <table className="w-full text-left border border-[#800000]">
        <thead>
          <tr className="border-b border-[#800000]">
            <th className="p-2">Task</th>
            <th className="p-2">Shift</th>
            <th className="p-2">Status</th>
            <th className="p-2">Staff</th>
            <th className="p-2">Created</th>
            {canEdit && <th className="p-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {tasks.map(t => (
            <tr key={t.id} className="border-b border-[#800000]">
              <td className="p-2">{t.task}</td>
              <td className="p-2">{t.shift}</td>
              <td className="p-2">
                {(canEdit || t.staff?.name === name) ? (
                  <select
                    className="border border-[#800000] bg-black text-[#FFD700]"
                    value={t.status}
                    onChange={e => updateStatus(t.id, e.target.value)}
                  >
                    <option value="pending">pending</option>
                    <option value="done">done</option>
                    <option value="skipped">skipped</option>
                  </select>
                ) : (
                  t.status
                )}
              </td>
              <td className="p-2">{t.staff?.name}</td>
              <td className="p-2">{new Date(t.created_at).toLocaleString()}</td>
              {canEdit && (
                <td className="p-2">
                  <button
                    className="border border-[#800000] px-2 mr-1"
                    onClick={() => deleteTask(t.id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {canEdit && (
        showForm ? (
          <form onSubmit={addTask} className="space-y-2">
            <input
              className="border border-[#800000] bg-black text-[#FFD700] p-1 w-full"
              placeholder="Task"
              value={formData.task}
              onChange={e => setFormData({ ...formData, task: e.target.value })}
            />
            <select
              className="border border-[#800000] bg-black text-[#FFD700] p-1 w-full"
              value={formData.shift}
              onChange={e => setFormData({ ...formData, shift: e.target.value })}
            >
              <option value="">Select Shift</option>
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
              <option value="Double">Double</option>
            </select>
            <select
              className="border border-[#800000] bg-black text-[#FFD700] p-1 w-full"
              value={formData.staff_id}
              onChange={e => setFormData({ ...formData, staff_id: e.target.value })}
            >
              <option value="">Select Staff</option>
              {staff.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <div className="space-x-2">
              <button type="submit" className="border border-[#800000] px-2 py-1">Save</button>
              <button type="button" className="border border-[#800000] px-2 py-1" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <button className="border border-[#800000] px-2 py-1" onClick={() => setShowForm(true)}>Add Task</button>
        )
      )}
    </div>
  )
}
